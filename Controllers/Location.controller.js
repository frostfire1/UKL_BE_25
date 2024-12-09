const LocationQuery = require('../queries/Location.query');

class LocationController {

    static async findLocationByName(req, res) {
        try {
            const search = req.query.name.toUpperCase();
            const location = await LocationQuery.findLocationByName(search);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(404).json({ message: 'Location not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createLocation(req, res) {
        try {
            const newLocation = await LocationQuery.createLocation(req.body);
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteLocation(req, res) {
        try {
            const deletedLocation = await LocationQuery.deleteLocation(req.params.id);
            if (deletedLocation) {
                res.status(200).json({ message: 'Location deleted successfully' });
            } else {
                res.status(404).json({ message: 'Location not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllLocations(req, res) {
        try {
            const locations = await LocationQuery.getAllLocations();
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLocationById(req, res) {
        try {
            const location = await LocationQuery.getLocationById(req.params.id);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(404).json({ message: 'Location not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findLocationByName(req, res) {
        try {
            const location = await LocationQuery.findLocationByName(req.params.name);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(404).json({ message: 'Location not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createLocation(req, res) {
        try {
            const newLocation = await LocationQuery.createLocation(req.body);
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteLocation(req, res) {
        try {
            const deletedLocation = await LocationQuery.deleteLocation(req.params.id);
            if (deletedLocation) {
                res.status(200).json({ message: 'Location deleted successfully' });
            } else {
                res.status(404).json({ message: 'Location not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = LocationController;
