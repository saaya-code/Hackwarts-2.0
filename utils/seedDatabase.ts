import { connectToDatabase } from "@/lib/mongodb";
import { Challenge } from "@/app/models/Challenge";
import { Submission } from "@/app/models/Submission";
import { Team } from "@/app/models/Team";
const seedDataBase = async () => {
  await connectToDatabase();
  const challenges = await Challenge.insertMany([
    {
      name: "Coding Marathon",
      sponsor_name: "TechCorp",
      description: "A 48-hour hackathon to solve coding challenges.",
      prize: "$10,000 and goodies",
      link: "https://techcorp.com/coding-marathon",
    },
    {
      name: "AI Innovation Challenge",
      sponsor_name: "AI Solutions Inc.",
      description:
        "Create innovative AI-driven solutions for real-world problems.",
      prize: "Tech gadgets worth $5,000",
      link: "https://aisolutions.com/ai-challenge",
    },
    {
      name: "Design Sprint",
      sponsor_name: "Creative Minds",
      description: "A design competition to create intuitive user interfaces.",
      prize: "$3,000 cash prize and design software licenses",
      link: "https://creativeminds.com/design-sprint",
    },
  ]);
  console.log("Seeded Challenges:", challenges);
  const teams = await Team.insertMany([
    {
      name: "Team Gryffindor",
      leader_name: "Harry Potter",
      leader_email: "harry@hogwarts.edu",
      members: [
        { name: "Hermione Granger", email: "hermione@hogwarts.edu" },
        { name: "Ron Weasley", email: "ron@hogwarts.edu" },
      ],
      house: "Gryffindor",
      selected_challenges: [challenges[0]._id, challenges[1]._id],
    },
    {
      name: "Team Ravenclaw",
      leader_name: "Luna Lovegood",
      leader_email: "luna@hogwarts.edu",
      members: [
        { name: "Cho Chang", email: "cho@hogwarts.edu" },
        { name: "Padma Patil", email: "padma@hogwarts.edu" },
      ],
      house: "Ravenclaw",
      selected_challenges: [challenges[1]._id, challenges[2]._id],
    },
  ]);
  console.log("Seeded Teams:", teams);

  // Seed the submissions
  const submissions = await Submission.insertMany([
    {
      team_id: teams[0]._id,
      challenge_id: challenges[0]._id,
      submission_url: "https://submission1.example.com",
    },
    {
      team_id: teams[0]._id,
      challenge_id: challenges[1]._id,
      submission_url: "https://submission2.example.com",
    },
    {
      team_id: teams[1]._id,
      challenge_id: challenges[1]._id,
      submission_url: "https://submission3.example.com",
      deployement_url: "https://deployment3.example.com",
    },
    {
      team_id: teams[1]._id,
      challenge_id: challenges[2]._id,
      submission_url: "https://submission4.example.com",
    },
  ]);

  console.log("Seeded Submissions:", submissions);
};

seedDataBase();
export default seedDataBase;
