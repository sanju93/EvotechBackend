import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Survey from "../models/Forms.js";
config();
class Users {
  async login(req, res) {
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        if (user.password === password) {
          let token = jwt.sign({ user }, process.env.secretKey, {
            expiresIn: "1d",
          });
          return res.status(200).json({ token });
        } else {
          return res.status(401).send("Password Wrong");
        }
      } else {
        return res.status(405).send("User not There!");
      }
    } catch (err) {
      return res.status(500).send("Internal server Error");
    }
  }

  async signup(req, res) {
    let { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(402).send("User Already There!");
      } else {
        await User.create({
          name,
          email,
          password,
        });

        return res.status(201).send("Registration Successfully");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server Error");
    }
  }

  async createSurvey(req, res) {
    let { name, gender, nationality, email, phone, address, message } =
      req.body;
    try {
      let survey = await Survey.create({
        name,
        gender,
        nationality,
        email,
        phone,
        address,
        message,
      });

      let users = await User.findById(req.user.id);
      users.surveyforms.push(survey.id);
      users.save();

      return res.status(201).send("Survey Form Has been filled");
    } catch (err) {
      return res.status(500).send("Internal server Error");
    }
  }

  async getForms(req, res) {
    try {
      let results = [];
      let user = await User.findById(req.user.id);
      for (let i = 0; i < user.surveyforms.length; i++) {
        let survey = await Survey.findById(user.surveyforms[i]);
        results.push(survey);
      }

      return res.status(201).json({ results });
    } catch (err) {
      return res.status(500).send("Internal Server error");
    }
  }
}

export default Users;
