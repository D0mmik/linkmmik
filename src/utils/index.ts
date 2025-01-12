export function getColor(id: number) {
  switch (id) {
    case 0:
      return "primary";
    case 1:
      return "secondary";
    case 2:
      return "success";
    case 3:
      return "warning";
    case 4:
      return "danger";
    default:
      return "default";
  }
}