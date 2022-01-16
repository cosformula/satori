let id = 0

export function getId() {
  return `satori-` + id++
}

export function resetId() {
  id = 0
}
