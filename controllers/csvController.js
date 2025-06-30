import multer from "multer";
import xlsx from "xlsx";
import Agent from "../models/Agent.js";
import List from "../models/List.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "text/csv", // .csv
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv, .xls, and .xlsx files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
}).single("file");
// export const upload = multer({ storage }).single("file");

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded or invalid file type" });
    }
    console.log("working on file..");
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const agents = await Agent.find();
    if (agents.length === 0)
      return res.status(400).json({ msg: "No agents found" });

    let i = 0;
    for (const row of data) {
      const agent = agents[i % agents.length];
      const listItem = new List({
        agentId: agent._id,
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
      });
      await listItem.save();
      i++;
    }

    res.json({ msg: "List distributed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAgentLists = async (req, res) => {
  const lists = await List.find().populate("agentId");
  res.json(lists);
};
