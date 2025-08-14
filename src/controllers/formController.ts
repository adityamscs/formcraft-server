import { Request, Response } from "express";
import { Form } from "../models/Form";
import { IForm } from "../types";

export const createForm = async (req: Request, res: Response) => {
  try {
    const formData: Partial<IForm> = req.body;

    // Basic validation
    if (!formData.title || formData.title.trim() === "") {
      return res.status(400).json({ message: "Form title is required" });
    }

    // Validate questions if present
    if (formData.questions) {
      for (const question of formData.questions) {
        if (!question.title || question.title.trim() === "") {
          return res
            .status(400)
            .json({ message: "Question title is required" });
        }

        // Validate question type specific fields
        if (question.type === "categorize") {
          if (!question.categories || question.categories.length === 0) {
            return res
              .status(400)
              .json({
                message: "Categorize question must have at least one category",
              });
          }
          if (!question.items || question.items.length === 0) {
            return res
              .status(400)
              .json({
                message: "Categorize question must have at least one item",
              });
          }
        } else if (question.type === "cloze") {
          if (!question.text) {
            return res
              .status(400)
              .json({ message: "Cloze question must have text" });
          }
          if (!question.blanks || question.blanks.length === 0) {
            return res
              .status(400)
              .json({ message: "Cloze question must have at least one blank" });
          }
        } else if (question.type === "comprehension") {
          if (!question.passage) {
            return res
              .status(400)
              .json({ message: "Comprehension question must have a passage" });
          }
          if (!question.questions || question.questions.length === 0) {
            return res
              .status(400)
              .json({
                message:
                  "Comprehension question must have at least one question",
              });
          }
        }
      }
    }

    const form = new Form(formData);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error creating form", error });
  }
};

export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

export const getFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error });
  }
};

export const getFormByShareLink = async (req: Request, res: Response) => {
  try {
    const { shareLink } = req.params;
    const form = await Form.findOne({ shareLink, isPublished: true });
    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found or not published" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error });
  }
};

export const updateForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const formData = req.body;

    // Basic validation
    if (formData.title !== undefined && formData.title.trim() === "") {
      return res.status(400).json({ message: "Form title cannot be empty" });
    }

    // Validate questions if present in update data
    if (formData.questions) {
      for (const question of formData.questions) {
        if (question.title !== undefined && question.title.trim() === "") {
          return res
            .status(400)
            .json({ message: "Question title cannot be empty" });
        }

        // Validate question type specific fields
        if (question.type === "categorize") {
          if (
            question.categories !== undefined &&
            (!question.categories || question.categories.length === 0)
          ) {
            return res
              .status(400)
              .json({
                message: "Categorize question must have at least one category",
              });
          }
          if (
            question.items !== undefined &&
            (!question.items || question.items.length === 0)
          ) {
            return res
              .status(400)
              .json({
                message: "Categorize question must have at least one item",
              });
          }
        } else if (question.type === "cloze") {
          if (question.text !== undefined && !question.text) {
            return res
              .status(400)
              .json({ message: "Cloze question text cannot be empty" });
          }
          if (
            question.blanks !== undefined &&
            (!question.blanks || question.blanks.length === 0)
          ) {
            return res
              .status(400)
              .json({ message: "Cloze question must have at least one blank" });
          }
        } else if (question.type === "comprehension") {
          if (question.passage !== undefined && !question.passage) {
            return res
              .status(400)
              .json({
                message: "Comprehension question passage cannot be empty",
              });
          }
          if (
            question.questions !== undefined &&
            (!question.questions || question.questions.length === 0)
          ) {
            return res
              .status(400)
              .json({
                message:
                  "Comprehension question must have at least one question",
              });
          }
        }
      }
    }

    const form = await Form.findByIdAndUpdate(id, formData, { new: true });
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error updating form", error });
  }
};

export const deleteForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error });
  }
};

export const publishForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndUpdate(
      id,
      { isPublished: true },
      { new: true }
    );
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error publishing form", error });
  }
};
