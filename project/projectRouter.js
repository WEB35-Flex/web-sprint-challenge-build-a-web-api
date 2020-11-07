const express = require("express");
const { orWhereNotExists } = require("../data/dbConfig");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/", (req, res) => {
  const project = req.body;

  Projects.insert(project)
    .then((p) => {
      res.status(201).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  Projects.get()
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateId, (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.update(id, changes)
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;

  Projects.get(id)
    .then((p) => {
      if (p) {
        req.project = p;

        next();
      } else {
        res
          .status(404)
          .json({ message: `Project with id of ${id} does not exist.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = router;
