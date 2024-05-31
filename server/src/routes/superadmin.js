import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if(email=="gepcoadmin@gmail.com" && password==="gepcoadmin56"){
    res.json("Login Sucessfully!")
  }
  else{
    res.json("Incorrect email or password")
  }
});


export { router as superadminRouter };
