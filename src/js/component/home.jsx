import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [tasks, addTask] = useState([]);
	return (
		<div className="bg-light h-100">
			<h1 className="display-1 text-secondary text-center">todos</h1>
			<ul className="list-group w-50 mx-auto mt-5 pb-5">
				<li className="list-group-item">
					<input
						className="form-control border-0 p-0"
						type="text"
						placeholder="Add new item..."
						aria-label="taskToAdd"
						onKeyPress={(e) => {
							if (e.key == "Enter") {
								addTask([...tasks, e.target.value]);
								e.target.value = "";
							}
						}}
					/>
				</li>
				{tasks.map((value, index) => {
					return (
						<li className="list-group-item" key={`${index}`}>
							<div className="d-flex">
								<div className="col-10">{value}</div>
								<div className="col-2 text-end">
									<i
										className="fas fa-times"
										id="cross"
										onClick={() => {
											let newItemsArray = tasks.filter(
												(v, i) => {
													return i != index;
												}
											);
											addTask(newItemsArray);
										}}></i>
								</div>
							</div>
						</li>
					);
				})}

				<li className="list-group-item text-muted fs-6">
					{tasks.length} items left
				</li>
			</ul>
		</div>
	);
};

export default Home;
