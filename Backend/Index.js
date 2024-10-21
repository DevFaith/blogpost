import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { db, storage } from "./Firebase/Admin.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
} from "firebase/firestore";
import cors from "cors"; // same port number 

const app = express();
const port = 4000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() }); // uploading images
app.use(cors())
// routes
// getting/reading the blogs
app.get("/blogs", async (req, res) => {
    try {
        // reading
        const snapShot = await getDocs(collection(db, "blogs"));
        const blogs = [];
        snapShot.docs.forEach((doc) => {
            const data = doc.data();
            blogs.push({
                id: doc.id,
                title: data.name,
                content: data.description,
                imageurl: data.ImageUrl,
            });
            console.log(data);

        });
        res.json({ blogs });
    } catch (error) {
        res.status(500).send("Error reading post " + error.message);
    }
});

// adding Blog
app.post("/addblog", upload.single("image"), async (req, res) => {
    const title = req.body.name;
    const content = req.body.description;

    // file multer
    const file = req.file;

    try {
        // firebase firestore storage
        // logic to write file to storage
        const refFolder = ref(storage, "blogImages/" + file.originalname);
        await uploadBytes(refFolder, file.buffer, { contentType: file.mimetype });
        const ImageUrl = await getDownloadURL(refFolder);

        //  write to database
        await addDoc(collection(db, "blogs"), { title, content, ImageUrl });
        res.status(201).send("Post created successfully");
    } catch (error) {
        res.status(500).send("Error submitting" + error.message);
    }
});

// delete
app.delete("/blogs/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const postRef = doc(db, "blogs", postId);
        await deleteDoc(postRef);
        res.send("Post Deleted");
    } catch (error) {
        res.status(500).send("Error submitting" + error.message);
    }
});

// url paramaeters - are values which extended from a route endpoint
// and usually change from time time

app.listen(port, () => {
    console.log("server running on " + port);
});