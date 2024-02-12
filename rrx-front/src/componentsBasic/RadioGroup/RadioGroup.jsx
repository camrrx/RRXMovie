import React, { useState } from "react";
import "./RadioGroup.scss";

export const RadioGroupBasic = ({ onValueChange }) => {
	const [selectedValue, setSelectedValue] = useState("value1"); // état initial vide

	const handleRadioChange = event => {
		const value = event.target.value;
		setSelectedValue(value); // Mettre à jour l'état avec la nouvelle valeur sélectionnée
		onValueChange(value); // Appeler la fonction de rappel avec la nouvelle valeur sélectionnée
	};

	return (
		<div className="radio-input">
			<label>
				<input
					value="value1"
					name="value-radio"
					id="value1"
					type="radio"
					checked={selectedValue === "value1"} // Vérifie si la valeur est sélectionnée
					onChange={handleRadioChange} // Appel à la fonction de gestion du changement
				/>
				<span>Upcoming</span>
			</label>
			<label>
				<input
					value="value2"
					name="value-radio"
					id="value2"
					type="radio"
					checked={selectedValue === "value2"}
					onChange={handleRadioChange}
				/>
				<span>A l'affiche</span>
			</label>
			<label>
				<input
					value="value3"
					name="value-radio"
					id="value3"
					type="radio"
					checked={selectedValue === "value3"}
					onChange={handleRadioChange}
				/>
				<span>Les mieux notés</span>
			</label>
			<span className="selection"></span>
		</div>
	);
};
