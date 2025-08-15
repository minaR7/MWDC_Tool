
export const getLocalFeatures = () => {
  const features = localStorage.getItem("features");
  return features ? JSON.parse(features) : [];
};

export const setLocalFeatures = (features) => {
  localStorage.setItem("features", JSON.stringify(features));
};
