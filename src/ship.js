class Ship {
	constructor(shipData) {
		this._name = shipData.name;
		this._directions = shipData.directions || [];
	}

	get name() {
		return this._name;
	}
	set name(value) {
		this._name = value.toString();
	}

	get directions() {
		return this._directions;
	}
	set directions(value) {
		this._directions = value;
	}
}

export default Ship;
