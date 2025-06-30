import Agent from "../models/Agent.js";
import List from "../models/List.js";

export const addAgent = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log("mobile:", mobile);

    if (!name || !email || !password || !mobile) {
      return res.status(400).send({ message: "all feilds are required" });
    }
    const agent = new Agent({ name, email, password, mobile });
    await agent.save();
    // res.json(agent);
    res.status(200).send({
      success: true,
      message: "agent is added",
      agent,
    });
  } catch (err) {
    return res.status(404).send({ success: false, message: `${err}` });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    // res.json(agents);
    res.status(200).send({
      success: true,
      message: "all agents",
      agents,
    });
  } catch (err) {
    return res.status(404).send({ success: false, message: `${err}` });
  }
};

export const getAgentsWithTasks = async (req, res) => {
  try {
    const agents = await Agent.find();
    const lists = await List.find().populate("agentId");

    const data = agents.map(agent => {
      const tasks = lists
        .filter(task => task.agentId?._id.toString() === agent._id.toString())
        .map(task => ({
          firstName: task.firstName,
          phone: task.phone,
          notes: task.notes,
        }));
      return {
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        tasks,
      };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

