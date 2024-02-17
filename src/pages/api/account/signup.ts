import User from "@/models/User";
import connectToDatabase from "@/utils/db";

connectToDatabase()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {

            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: 'Username already exist' })
            }

            const newUser = new User({
                username,
                password,
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}