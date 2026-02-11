# **App Name**: TraceBack

## Core Features:

- User Authentication: Secure user signup and login with email/OTP verification, leveraging Firebase Authentication.
- Report Lost Item: Enable users to report lost items with detailed information (item name, category, description, unique identifier, date lost, location with map picker, and image upload), storing data in Firestore and generating a Complaint Reference ID.
- Report Found Item: Allow users to report found items with relevant details (item category, description, location found, and image upload), saving the data to Firestore.
- Matching System: Implement a system to match lost and found items based on category, keywords, and identifiers. The matching algorithm will use a tool to decide if potential matches include items which can be identified as potential matches using OCR of image data.
- Item Tracking: Provide users with a dashboard to view their submitted reports and track the status of their items (Reported, Under Review, Matched, Recovered).
- Verification and Claim: Implement an OTP verification process and proof/description validation before allowing users to claim a matched item.
- Admin/Police Dashboard: Create a dashboard for administrators and police to view all lost and found items, update item status, and filter by category and location.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB), reminiscent of trust and security, creating a calm and reliable impression.
- Background color: Very light blue (#F0F8FF), almost white, providing a clean and uncluttered backdrop to emphasize the app's content.
- Accent color: Muted lavender (#BFA0E3), an analogous hue that adds a touch of sophistication without overwhelming the primary color.
- Headline font: 'Space Grotesk', sans-serif, for a modern and technological feel; for the body of text, use 'Inter', a sans-serif font that supports readability and clear information presentation.
- Use clear, consistent icons from a minimalist set to represent item categories and status indicators, ensuring ease of understanding and navigation.
- Employ a card-based layout for items, with responsive grids to ensure a consistent and intuitive experience across devices.
- Subtle transitions and loading animations provide feedback during actions, improving user engagement.