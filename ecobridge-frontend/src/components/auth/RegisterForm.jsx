import { useState } from "react";
import businessIcon from "/src/assets/Business owner vector.png";
import adminIcon from "/src/assets/admin vector.png";
import partnerIcon from "/src/assets/tabler_bus-filled.png";

const roles = [
	{
		id: "business",
		title: "Business owner",
		subtitle: "Hotels, Restaurants, Catering business etc",
		description:
			"If you own a small business and are looking for the best way to manage your waste, you have found the best solution!",
		icon: businessIcon,
	},
	{
		id: "partner",
		title: "Partner",
		subtitle: "Collectors, Recyclers, Composters",
		description:
			"If you collect, process, or repurpose waste materials, this option helps you discover available waste, connect with businesses, and manage pickup requests efficiently.",
		icon: partnerIcon,
	},
	{
		id: "admin",
		title: "Admin",
		subtitle: "Platform administrator access",
		description:
			"For authorized personnel managing system operations, user activity, waste records, and platform performance to ensure smooth and secure ecosystem functionality.",
		icon: adminIcon,
	},
];

export default function RegisterForm() {
	const [selected, setSelected] = useState("business");

	function handleSignUp(role) {
		// Placeholder: wire this to your registration flow or route
		console.log("Sign up as:", role);
		alert(`Continue sign up as: ${role}`);
	}

	return (
		<div className="w-full min-h-screen flex items-center justify-center onboarding-bg inter">
			<div className="max-w-6xl w-full px-6 py-12">
				<div className="text-center mb-8">
					<h1 className="montserrat-heading text-gray-800">Welcome to Ecobridge!</h1>
					<p className="text-gray-600 mt-4">Track, Segregate, Recover. Turn your waste into value</p>
					<p className="text-gray-600 mt-6">Please choose what best describes you to get started!</p>
				</div>

				<div className="roles-grid">
					{roles.map((r) => (
						<div
							key={r.id}
							onClick={() => setSelected(r.id)}
							className={`role-card cursor-pointer transition transform hover:-translate-y-1 ${
								selected === r.id ? "ring-2 ring-green-300" : ""
							}`}
						>
							<div className="role-header" style={{ width: '100%' }}>
								<div className="role-left">
									<img src={r.icon} alt={`${r.title} icon`} className="role-icon" />
									<div className="role-title-block">
										<h3 className="text-lg font-semibold text-gray-800">{r.title}</h3>
									</div>
								</div>

								<div className="role-check-wrapper">
									<div className={`role-check ${selected === r.id ? 'role-check-selected' : ''}`}>
										{selected === r.id ? '✔' : ''}
									</div>
								</div>
							</div>

							<p className="role-subtitle text-sm text-gray-500">{r.subtitle}</p>

							<hr className="role-divider" />

							<p className="text-sm text-gray-600 mt-2 desc">{r.description}</p>

							<div className="mt-6 flex justify-center">
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleSignUp(r.id);
									}}
									className="cta-btn text-sm font-medium"
								>
									Sign Up
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="text-center text-sm text-gray-600 mt-6">
					Already have an account? <a href="/login" className="text-green-700 underline">Sign in</a>
				</div>
			</div>
		</div>
	);
}
