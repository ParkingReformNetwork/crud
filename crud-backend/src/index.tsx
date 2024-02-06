import express, { Express, Request, Response, Application } from 'express';``
// const express = require("express");
import dotenv from 'dotenv';
// const dotenv = require("dotenv");
import { createClient } from '@supabase/supabase-js';
// const createClient = require("@supabase/supabase-js")
// const cors = require("cors");
import cors from "cors";


// for env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabasePublicAnonKey = process.env.SUPABASE_PUBLIC_ANON_KEY ?? '';

console.log(supabaseUrl);

const supabase = createClient(supabaseUrl, supabasePublicAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false
  }
});

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());

app.post('/auth/google', async(req: Request, res: Response) => {
  console.log("Hello");
  const { access_token } = req.body;
  console.log(req.body);

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
      },
    });

    console.log(data);
    res.status(200).json({ success: true, message: "Login successful" });
  } catch(error) {
    console.error("Error: ", error);
  }
})

app.listen(8000, () => {
	console.group(`Server is running on http://localhost:${port}`);
})


