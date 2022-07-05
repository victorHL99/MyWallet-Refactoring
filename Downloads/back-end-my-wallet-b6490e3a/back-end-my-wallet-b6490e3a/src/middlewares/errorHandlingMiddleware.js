export async function handleError(error, req, res, next) {
  console.error(error);
  if (error.type === "UserAlreadyExists") {
    return res.status(409).json({
      error: error.message,
    });
  }
  if (error.type === "InvalidCredentials") {
    return res.status(401).json({
      error: error.message,
    });
  }
  if (error.type === "MissingFields") {
    return res.status(422).json({
      error: error.message,
    });
  }
  return res.status(500).json({
    error: "Internal server error",
  });
}
