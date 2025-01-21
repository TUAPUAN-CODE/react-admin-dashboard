const Header = ({ title, user }) => {
	return (
		<header
			style={{
				backgroundColor: "#f9f9f9",
				color: "#686868",
				paddingTop: "10px",
			}}
			className="bg-opacity-50 backdrop-blur-md overflow-hidden"
		>
			<div className="max-w-8xl mx-auto py-4 px-4 sm:px-6 lg:px-7 flex items-center justify-between">
				{/* Title */}
				<h1 className="text-3xl font-semibold">{title}</h1>

				{/* User Card */}
				<div
					style={{
						backgroundColor: "#ffffff",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						borderRadius: "8px",
						padding: "10px 15px",
					}}
					className="flex items-center"
				>
					{/* Icon หรือ Profile Picture */}
					<div
						style={{
							width: "40px",
							height: "40px",
							borderRadius: "50%",
							backgroundColor: "#616874",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							marginRight: "10px",
						}}
					>
						{user?.name.charAt(0).toUpperCase()}
					</div>
					{/* User Details */}
					<div>
						<p className="text-sm font-medium">{user?.name || "พีรพัฒ ป่วนปั่น"}</p>
						<p className="text-xs text-gray-500">{user?.role || "Administrator | จุดเตรียมไก่"}</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
