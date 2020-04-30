const db = require("../data/config");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then((res) => {
      return res !== undefined ? res : null;
    });
}

function findSteps(id) {
  return db("steps as s")
    .leftJoin("schemes as sc", "s.id", "sc.id")
    .select(["s.id", "sc.scheme_name", "s.step_number", "s.instructions"])
    .where("s.scheme_id", id);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((res) => {
      return findById(res[0]);
    });
}

function update(changes, id) {
  return db("schemes").where({ id }).update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del()
    .then((res) => {
      return res === 1 ? `scheme with id ${id}` : null;
    });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
