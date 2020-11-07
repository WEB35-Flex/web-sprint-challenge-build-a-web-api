const { json } = require("express");
const express = require("express");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/", (req, res) => {
  const action = req.body;

  Actions.insert(action)
    .then((a) => {
      res.status(201).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  Actions.get()
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.actions);
});

router.put("/:id", validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Actions.update(id, changes)
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;

  Actions.get(id)
    .then((p) => {
      if (p) {
        req.actions = p;

        next();
      } else {
        res
          .status(404)
          .json({ message: `Action with id of ${id} does not exist.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = router;
