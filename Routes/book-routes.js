const express=require("express");
const router=express.Router();
const{
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
}=require("..controllers/book-controller");

router.get("/get",);
router.get("/get/:id",);
router.post("/add",);
router.put("update/:id",);
router.delete("/delete/:id",);
