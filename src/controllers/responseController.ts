import { Request, Response } from 'express';
import { FormResponse } from '../models/FormResponse';
import { Form } from '../models/Form';
import { IFormResponse } from '../types';

export const submitResponse = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const responseData: Partial<IFormResponse> = {
      ...req.body,
      formId,
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    // Verify form exists and is published
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    if (!form.isPublished) {
      return res.status(403).json({ message: 'Form is not published' });
    }

    const response = new FormResponse(responseData);
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting response', error });
  }
};

export const getResponses = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const responses = await FormResponse.find({ formId }).sort({ submittedAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching responses', error });
  }
};

export const getResponseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await FormResponse.findById(id);
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching response', error });
  }
}; 