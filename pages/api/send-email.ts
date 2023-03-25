import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import WelcomeTemplate from "../../emails/WelcomeTemplate";
import PasswordTemplate from "../../emails/PasswordTemplate";
import { sendEmail } from "../../lib/email";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.body.type == 'pass'){
        await sendEmail({
            to: req.body.email,
            subject: req.body.subject,
            html: render(PasswordTemplate(req.body.name, req.body.token)),
        });
    }else{
        await sendEmail({
            to: req.body.email,
            subject: req.body.subject,
            html: render(WelcomeTemplate(req.body.name, req.body.token)),
        });
    }
    

    return res.status(200).json({ message: "Email has been sent"});
}