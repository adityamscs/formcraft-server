import { Request, Response } from 'express';
import { Form } from '../models/Form';
import { IForm } from '../types';

export const createForm = async (req: Request, res: Response) => {
  try {
    const formData: Partial<IForm> = req.body;
    const form = new Form(formData);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error creating form', error });
  }
};

export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error });
  }
};

export const getFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form', error });
  }
};

export const getFormByShareLink = async (req: Request, res: Response) => {
  try {
    const { shareLink } = req.params;
    const form = await Form.findOne({ shareLink, isPublished: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found or not published' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form', error });
  }
};

export const updateForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const form = await Form.findByIdAndUpdate(id, formData, { new: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error updating form', error });
  }
};

export const deleteForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting form', error });
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
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error publishing form', error });
  }
}; 