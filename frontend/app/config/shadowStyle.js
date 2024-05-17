const createShadow = ({
  color = '#fff',
  offset = { width: 0, height: 0 },
  opacity = 1,
  radius = 5,
  elevation = 2,
} = {}) => {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };
};

export default createShadow;
