import ProtectedRoute from "./ProtectedRoute";

const AdminRoute = ({ children }) => {
  return <ProtectedRoute adminOnly>{children}</ProtectedRoute>;
};

export default AdminRoute;
