import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import WelcomeTemplate from "../../emails/WelcomeTemplate";
import { sendEmail } from "../../lib/email";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await sendEmail({
        to: req.body.email,
        subject: "Login to TeaTime with your magic link",
        html: render(WelcomeTemplate(req.body.name, req.body.token)),
    });

    return res.status(200).json({ message: "Email has been sent"});
}