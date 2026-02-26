import * as authApi from "./authApi";
import * as wasteApi from "./wasteApi";
import * as pickupApi from "./pickupApi";
import * as partnerApi from "./partnerApi";
import * as adminApi from "./adminApi";
import * as notificationApi from "./notificationApi";
import * as historyApi from "./historyApi";
import * as messageApi from "./messageApi";

// Test data
const testSMEData = {
  fullName: "Test SME",
  email: "testsme@example.com",
  password: "TestPass123",
  confirmPassword: "TestPass123",
  businessName: "Test Business",
  location: "Lagos",
  businessType: "Hotel",
};

const testPartnerData = {
  fullName: "Test Partner",
  email: "testpartner@example.com",
  password: "TestPass123",
  confirmPassword: "TestPass123",
  businessName: "Test Recycling",
  location: "Abuja",
  businessType: "Recycling",
};

const testLoginData = {
  email: "testsme@example.com",
  password: "TestPass123",
};

const testWasteData = {
  wasteCategory: "plastic",
  description: "Test waste",
  quantity: 50,
  wasteCondition: "Fresh",
  pickupAddress: "Test Address",
  availableDate: "2026-02-26",
  availableTime: "10:00",
  urgency: "Normal",
  price: 2000,
  status: "Draft",
  imagePath: "uploads/test.jpg",
};

const testPickupData = {
  wasteCategory: "plastic",
  quantity: 20,
  pickupAddress: "Test Factory",
  pickupLocation: { type: "Point", coordinates: [3.45, 6.45] },
  availableDate: "2026-02-26",
  availableTime: "10:00",
  wasteCondition: "Fresh",
  description: "Test pickup request",
  imagePath: ["uploads/test.jpg"],
  wasteLogId: "699ea153feb18c1ffe03dc5c",
};

// Test functions
export const testAllEndpoints = async () => {
  console.log("🧪 Starting Endpoint Tests...\n");

  try {
    // Auth Tests
    console.log("📝 Testing Auth Endpoints...");
    await testAuthEndpoints();

    // Waste Tests
    console.log("\n📦 Testing Waste Endpoints...");
    await testWasteEndpoints();

    // Pickup Tests
    console.log("\n🚚 Testing Pickup Endpoints...");
    await testPickupEndpoints();

    // Partner Tests
    console.log("\n🤝 Testing Partner Endpoints...");
    await testPartnerEndpoints();

    // Admin Tests
    console.log("\n👨‍💼 Testing Admin Endpoints...");
    await testAdminEndpoints();

    // Notification Tests
    console.log("\n🔔 Testing Notification Endpoints...");
    await testNotificationEndpoints();

    // History Tests
    console.log("\n📋 Testing History Endpoints...");
    await testHistoryEndpoints();

    // Message Tests
    console.log("\n💬 Testing Message Endpoints...");
    await testMessageEndpoints();

    console.log("\n✅ All tests completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Individual test functions
const testAuthEndpoints = async () => {
  try {
    // Test Login
    console.log("  ✓ Testing login...");
    const loginResponse = await authApi.login(testLoginData);
    console.log("    ✓ Login successful:", loginResponse);

    // Test Forgot Password
    console.log("  ✓ Testing forgot password...");
    const forgotResponse = await authApi.forgotPassword(testLoginData.email);
    console.log("    ✓ Forgot password:", forgotResponse);
  } catch (error) {
    console.error("  ✗ Auth test failed:", error.response?.data || error.message);
  }
};

const testWasteEndpoints = async () => {
  try {
    // Test Create Waste Log
    console.log("  ✓ Testing create waste log...");
    const createResponse = await wasteApi.createWasteLog(testWasteData);
    console.log("    ✓ Waste log created:", createResponse);
    const wasteLogId = createResponse.wasteSummary?._id || "test-id";

    // Test Get My Waste Logs
    console.log("  ✓ Testing get my waste logs...");
    const logsResponse = await wasteApi.getMyWasteLogs();
    console.log("    ✓ Fetched logs:", logsResponse);

    // Test Update Waste Log
    console.log("  ✓ Testing update waste log...");
    const updateResponse = await wasteApi.updateWasteLog(wasteLogId, {
      quantity: "60",
    });
    console.log("    ✓ Waste log updated:", updateResponse);
  } catch (error) {
    console.error("  ✗ Waste test failed:", error.response?.data || error.message);
  }
};

const testPickupEndpoints = async () => {
  try {
    // Test Request Pickup
    console.log("  ✓ Testing request pickup...");
    const pickupResponse = await pickupApi.requestPickup(testPickupData);
    console.log("    ✓ Pickup requested:", pickupResponse);
    const pickupId = pickupResponse.data?._id || "test-id";

    // Test Get All Pickups
    console.log("  ✓ Testing get all pickups...");
    const allPickups = await pickupApi.getAllPickups();
    console.log("    ✓ Fetched pickups:", allPickups);

    // Test Get Pickup by ID
    console.log("  ✓ Testing get pickup by ID...");
    const singlePickup = await pickupApi.getPickupById(pickupId);
    console.log("    ✓ Fetched pickup:", singlePickup);
  } catch (error) {
    console.error(
      "  ✗ Pickup test failed:",
      error.response?.data || error.message
    );
  }
};

const testPartnerEndpoints = async () => {
  try {
    // Test Get Available Wastes
    console.log("  ✓ Testing get available wastes...");
    const wastesResponse = await partnerApi.getAvailableWastes({
      category: "plastic",
    });
    console.log("    ✓ Fetched available wastes:", wastesResponse);

    // Test Get Available Wastes with filters
    console.log("  ✓ Testing get wastes with multiple filters...");
    const filteredWastes = await partnerApi.getAvailableWastes({
      category: "plastic",
      urgent: true,
      nearby: "3.45,6.45",
      maxDistance: 5000,
    });
    console.log("    ✓ Fetched filtered wastes:", filteredWastes);
  } catch (error) {
    console.error(
      "  ✗ Partner test failed:",
      error.response?.data || error.message
    );
  }
};

const testAdminEndpoints = async () => {
  try {
    // Test Get Admin Dashboard
    console.log("  ✓ Testing admin dashboard...");
    const dashboardResponse = await adminApi.getAdminDashboard();
    console.log("    ✓ Fetched dashboard:", dashboardResponse);
  } catch (error) {
    console.error(
      "  ✗ Admin test failed:",
      error.response?.data || error.message
    );
  }
};

const testNotificationEndpoints = async () => {
  try {
    // Test Get Notifications
    console.log("  ✓ Testing get notifications...");
    const notificationsResponse = await notificationApi.getNotifications();
    console.log("    ✓ Fetched notifications:", notificationsResponse);

    // Test Get Unread Count
    console.log("  ✓ Testing get unread count...");
    const countResponse = await notificationApi.getUnreadCount();
    console.log("    ✓ Unread count:", countResponse);
  } catch (error) {
    console.error(
      "  ✗ Notification test failed:",
      error.response?.data || error.message
    );
  }
};

const testHistoryEndpoints = async () => {
  try {
    // Test Get History without filters
    console.log("  ✓ Testing get history...");
    const historyResponse = await historyApi.getUserHistory();
    console.log("    ✓ Fetched history:", historyResponse);

    // Test Get History with filters
    console.log("  ✓ Testing get history with filters...");
    const filteredHistory = await historyApi.getUserHistory({
      type: "logs",
      status: "Draft",
      page: 1,
      limit: 10,
    });
    console.log("    ✓ Fetched filtered history:", filteredHistory);
  } catch (error) {
    console.error(
      "  ✗ History test failed:",
      error.response?.data || error.message
    );
  }
};

const testMessageEndpoints = async () => {
  try {
    // Test Get Inbox
    console.log("  ✓ Testing get inbox...");
    const inboxResponse = await messageApi.getInbox();
    console.log("    ✓ Fetched inbox:", inboxResponse);
  } catch (error) {
    console.error(
      "  ✗ Message test failed:",
      error.response?.data || error.message
    );
  }
};

// Run tests from browser console
window.testAllEndpoints = testAllEndpoints;
