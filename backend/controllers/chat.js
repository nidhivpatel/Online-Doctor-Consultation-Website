import Chat from "../models/chat.js";

export const createChat = async (req, res) => {
  console.log("create Chat");
  try {
    var count = await Chat.countDocuments({
      user: req.body.userId,
      doctor: req.body.doctorId,
    });

    if (count == 0) {
      var chat = new Chat({
        user: req.body.userId,
        doctor: req.body.doctorId,
        userName: req.body.userName,
        doctorName: req.body.doctorName,
        date: req.body.date,
        slot: req.body.slot,
      });
      await chat.save();
      return res.json({ status: "ok", chat: chat });
    } else {
      console.log("Updating chat...");
      var chat = await Chat.findOneAndUpdate(
        {
          user: req.body.userId,
          doctor: req.body.doctorId,
        },
        {
          date: req.body.date,
          slot: req.body.slot,
        },
        {
          new: true,
        }
        // function (er, item) {
        //   if (er) {
        //     console.log(er);
        //     return res.json({ status: "error", error: "Not Updated!" });
        //   }
        //   console.log(item);
        //   return res.json({ status: "ok", chat: item });
        // }
      );
      console.log(chat);
      if (!chat) {
        console.log("Error in updating chat");
        return res.json({ status: "error", error: "Not Updated!" });
      }
      console.log("Chat updated!");
      return res.json({ status: "ok", chat: chat });
    }
  } catch (er) {
    console.log("Error in create chat : ", er);
    return res.json({ status: "error", error: er });
  }
};

export const getChat = async (req, res) => {
  console.log("Get chat");
  try {
    const chat = await Chat.findOne({
      _id: req.body.id,
    });
    res.json({ status: "ok", chat: chat });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getUserDoctorChat = async (req, res) => {
  console.log("Get user doctor chat");
  try {
    var count = await Chat.countDocuments({
      user: req.body.userId,
      doctor: req.body.doctorId,
    });

    if (count == 0) {
      return res.json({ status: "not" });
    } else {
      const chat = await Chat.findOne({
        user: req.body.userId,
        doctor: req.body.doctorId,
      });
      res.json({ status: "ok", chat: chat });
    }
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getUserChats = async (req, res) => {
  console.log("get user chats");
  try {
    const chats = await Chat.find({
      user: req.body.id,
    });
    res.json(chats);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getDoctorChats = async (req, res) => {
  console.log("get doctor chats");
  try {
    const chats = await Chat.find({
      doctor: req.body.id,
    });
    res.json(chats);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const addMessage = async (req, res) => {
  console.log(req.body);
  try {
    const chat = await Chat.findOne({
      _id: req.body.id,
    });
    if (!chat) {
      res.json({ status: "error" });
      return;
    }
    chat.messages.push({
      content: req.body.content,
      isDoctor: req.body.isDoctor,
      time: req.body.time,
    });
    await chat.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

export const getMessages = async (req, res) => {
  console.log("get messages");
  try {
    const chat = await Chat.findOne({
      _id: req.body.id,
    });
    res.json({ status: "ok", messages: chat.messages });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getDoctorSlots = async (req, res) => {
  console.log("get doctor slots");
  try {
    const chats = await Chat.find({
      doctor: req.body.id,
    });
    res.json(chats);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const isSlotAvailable = (req, res) => {
  console.log(req.body);
  Chat.findOne({
    doctor: req.body.id,
    date: req.body.date,
    slot: req.body.slot,
  })
    .then((chat) => res.status(200).json(chat))
    .catch((err) =>
      res.status(201).json({ message: "unknown error occurred" })
    );
};
