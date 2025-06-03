
export const useUrgencyAnimation = (urgency: "low" | "medium" | "high") => {
  switch (urgency) {
    case "high":
      return {
        scale: [1, 1.02, 1],
        boxShadow: [
          "0 0 0 0 rgba(239, 68, 68, 0)",
          "0 0 0 10px rgba(239, 68, 68, 0.1)",
          "0 0 0 20px rgba(239, 68, 68, 0)"
        ]
      };
    case "medium":
      return {
        scale: [1, 1.01, 1]
      };
    default:
      return {};
  }
};
