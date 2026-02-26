import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";

const Notifications = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get("/api/notifications")
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        const list =
          payload?.notifications ||
          payload?.data ||
          (Array.isArray(payload) ? payload : []);
        setNotifications(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (cancelled) return;

        // #region agent log
        fetch(
          "http://127.0.0.1:7507/ingest/56b395a6-7fc8-4b95-993b-a061c9e4db11",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "8f2768",
            },
            body: JSON.stringify({
              sessionId: "8f2768",
              runId: "notifications",
              hypothesisId: "notifications",
              location:
                "src/pages/dashboards/Notifications.jsx:useEffect fetch",
              message: "Notifications fetch failed",
              data: {
                message: err.message,
                status: err.response?.status,
                url: err.config?.url,
              },
              timestamp: Date.now(),
            }),
          },
        ).catch(() => {});
        // #endregion agent log

        setError(
          err.response?.data?.message ||
            "Unable to load notifications. Please try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const markAsRead = async (notification) => {
    if (!notification || !notification._id) return;
    try {
      await api.put(`/api/notifications/${notification._id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          (n._id || n.id) === (notification._id || notification.id)
            ? { ...n, read: true, isRead: true }
            : n,
        ),
      );
    } catch (err) {
      // fire-and-forget; errors are non-blocking here
    }
  };

  const handleClose = () => {
    const dashboardPath =
      userType === "partner"
        ? "/partner-homepage"
        : userType === "business"
          ? "/pickup-requests"
          : "/admin-dashboard";
    navigate(dashboardPath);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType || "admin"} />

      {/* Main Content */}
      <div className="flex-1 ml-56 p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Notifications
          </h1>

          {error && (
            <p className="text-sm text-red-600 mb-3" role="alert">
              {error}
            </p>
          )}

          <div className="bg-[#E8F5E9] rounded-lg overflow-hidden">
            {loading && (
              <div className="p-4 text-sm text-gray-600">Loading…</div>
            )}
            {!loading &&
              notifications.map((notification, index) => {
                const id = notification._id || notification.id;
                const title =
                  notification.title || notification.message || "Notification";
                const createdAt = notification.createdAt;
                const time = createdAt
                  ? new Date(createdAt).toLocaleString()
                  : "";
                const description =
                  notification.description || notification.body || "";
                const isRead = notification.read || notification.isRead;
                const color = isRead ? "bg-gray-300" : "bg-[#4A7C59]";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => markAsRead(notification)}
                    className={`w-full text-left p-4 flex items-start justify-between ${
                      index !== notifications.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    } ${isRead ? "opacity-70" : ""}`}
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">{time}</p>
                      {description && (
                        <p className="text-xs text-gray-600">{description}</p>
                      )}
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${color} flex-shrink-0 mt-1`}
                    ></div>
                  </button>
                );
              })}
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
