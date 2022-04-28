import React, { useState, useEffect } from "react";

//create your first component

const Home = () => {
	const [tasks, addTask] = useState([]);
	const getList = (addTask) => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jaygosling",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => addTask(result))
			.catch((error) => console.log("error", error));
	};
	const sendList = (updList) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(updList);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jaygosling",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		getList(addTask);
	}, []);
	useEffect(() => {
		sendList(tasks);
	}, [tasks]);
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
								addTask([
									...tasks,
									{ label: e.target.value, done: false },
								]);
								e.target.value = "";
							}
						}}
					/>
				</li>
				{tasks.map((object, index) => {
					if (object.done == false) {
						return (
							<li className="list-group-item" key={`${index}`}>
								<div className="d-flex">
									<div className="col-10">{object.label}</div>
									<div className="col-2 text-end">
										<i
											className="fas fa-times"
											id="cross"
											onClick={() => {
												let newItemsArray =
													tasks.filter((v, i) => {
														return i != index;
													});
												addTask(newItemsArray);
											}}></i>
									</div>
								</div>
							</li>
						);
					}
				})}

				<li className="list-group-item text-center">
					<button
						className="btn btn-outline-dark btn-sm"
						onClick={() => {
							addTask([
								{
									label: "Always one task remaining",
									done: true,
								},
							]);
						}}>
						Clear all
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Home;
