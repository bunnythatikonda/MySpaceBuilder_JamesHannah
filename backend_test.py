#!/usr/bin/env python3
"""
Backend API Tests for James Hannah Auto Body & Collision Center
Tests all endpoints with realistic data and edge cases
"""

import requests
import json
import os
from datetime import datetime, timedelta

# Load base URL from .env
BASE_URL = "https://james-hannah-repairs.preview.emergentagent.com/api"

def print_test_result(test_name, passed, details=""):
    """Print formatted test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"\n{status}: {test_name}")
    if details:
        print(f"  Details: {details}")

def test_health_check():
    """Test GET /api - Health check endpoint"""
    print("\n" + "="*80)
    print("TEST 1: Health Check Endpoint")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if 'status' in data and data['status'] == 'ok' and 'service' in data:
                print_test_result("Health check endpoint", True, f"Service: {data.get('service')}")
                return True
            else:
                print_test_result("Health check endpoint", False, "Missing 'status' or 'service' in response")
                return False
        else:
            print_test_result("Health check endpoint", False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Health check endpoint", False, f"Exception: {str(e)}")
        return False

def test_create_estimate_success():
    """Test POST /api/estimates - Create estimate with all required fields"""
    print("\n" + "="*80)
    print("TEST 2: Create Estimate - Success Case")
    print("="*80)
    
    try:
        payload = {
            "name": "John Smith",
            "phone": "(316) 555-0123",
            "email": "john.smith@example.com",
            "vehicle": "2021 Tesla Model 3",
            "description": "Front bumper damage from parking lot incident. Need estimate for repair and paint matching.",
            "preferredDate": "2024-02-15",
            "photos": ["data:image/jpeg;base64,/9j/4AAQSkZJRg=="]
        }
        
        response = requests.post(f"{BASE_URL}/estimates", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'id' in data and 'message' in data:
                print_test_result("Create estimate (success)", True, f"ID: {data['id']}")
                return True, data['id']
            else:
                print_test_result("Create estimate (success)", False, "Missing success/id/message in response")
                return False, None
        else:
            print_test_result("Create estimate (success)", False, f"Expected 200, got {response.status_code}")
            return False, None
    except Exception as e:
        print_test_result("Create estimate (success)", False, f"Exception: {str(e)}")
        return False, None

def test_create_estimate_missing_field():
    """Test POST /api/estimates - Missing required field returns 400"""
    print("\n" + "="*80)
    print("TEST 3: Create Estimate - Missing Required Field")
    print("="*80)
    
    try:
        # Missing 'email' field
        payload = {
            "name": "Jane Doe",
            "phone": "(316) 555-0456",
            "vehicle": "2019 Honda Accord",
            "description": "Rear door dent repair needed"
        }
        
        response = requests.post(f"{BASE_URL}/estimates", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data and 'email' in data['error'].lower():
                print_test_result("Create estimate (missing field)", True, f"Error: {data['error']}")
                return True
            else:
                print_test_result("Create estimate (missing field)", False, "Error message doesn't mention missing field")
                return False
        else:
            print_test_result("Create estimate (missing field)", False, f"Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Create estimate (missing field)", False, f"Exception: {str(e)}")
        return False

def test_get_estimates():
    """Test GET /api/estimates - List all estimates"""
    print("\n" + "="*80)
    print("TEST 4: Get Estimates List")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/estimates", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # Truncate long response
        
        if response.status_code == 200:
            data = response.json()
            if 'estimates' in data and isinstance(data['estimates'], list):
                print_test_result("Get estimates list", True, f"Found {len(data['estimates'])} estimates")
                return True
            else:
                print_test_result("Get estimates list", False, "Missing 'estimates' array in response")
                return False
        else:
            print_test_result("Get estimates list", False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Get estimates list", False, f"Exception: {str(e)}")
        return False

def test_create_booking_success():
    """Test POST /api/bookings - Create booking with all required fields"""
    print("\n" + "="*80)
    print("TEST 5: Create Booking - Success Case")
    print("="*80)
    
    try:
        # Use tomorrow's date
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        payload = {
            "name": "Michael Johnson",
            "phone": "(316) 555-0789",
            "email": "michael.j@example.com",
            "service": "Collision Repair",
            "date": tomorrow,
            "time": "10:00 AM",
            "vehicle": "2020 Ford F-150",
            "notes": "Need to drop off vehicle early morning"
        }
        
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'id' in data and 'confirmationCode' in data:
                conf_code = data['confirmationCode']
                if conf_code.startswith('JH-') and len(conf_code) == 9:
                    print_test_result("Create booking (success)", True, f"Confirmation: {conf_code}")
                    return True, tomorrow, "10:00 AM"
                else:
                    print_test_result("Create booking (success)", False, f"Invalid confirmation code format: {conf_code}")
                    return False, None, None
            else:
                print_test_result("Create booking (success)", False, "Missing success/id/confirmationCode in response")
                return False, None, None
        else:
            print_test_result("Create booking (success)", False, f"Expected 200, got {response.status_code}")
            return False, None, None
    except Exception as e:
        print_test_result("Create booking (success)", False, f"Exception: {str(e)}")
        return False, None, None

def test_create_booking_conflict(date, time):
    """Test POST /api/bookings - Duplicate booking returns 409"""
    print("\n" + "="*80)
    print("TEST 6: Create Booking - Slot Conflict")
    print("="*80)
    
    try:
        payload = {
            "name": "Sarah Williams",
            "phone": "(316) 555-0321",
            "email": "sarah.w@example.com",
            "service": "Paint Job",
            "date": date,
            "time": time,
            "vehicle": "2018 Chevrolet Malibu"
        }
        
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 409:
            data = response.json()
            if 'error' in data:
                print_test_result("Create booking (conflict)", True, f"Error: {data['error']}")
                return True
            else:
                print_test_result("Create booking (conflict)", False, "Missing error message in 409 response")
                return False
        else:
            print_test_result("Create booking (conflict)", False, f"Expected 409, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Create booking (conflict)", False, f"Exception: {str(e)}")
        return False

def test_create_booking_missing_field():
    """Test POST /api/bookings - Missing required field returns 400"""
    print("\n" + "="*80)
    print("TEST 7: Create Booking - Missing Required Field")
    print("="*80)
    
    try:
        # Missing 'vehicle' field
        payload = {
            "name": "Robert Brown",
            "phone": "(316) 555-0654",
            "email": "robert.b@example.com",
            "service": "Dent Removal",
            "date": "2024-02-20",
            "time": "2:00 PM"
        }
        
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data and 'vehicle' in data['error'].lower():
                print_test_result("Create booking (missing field)", True, f"Error: {data['error']}")
                return True
            else:
                print_test_result("Create booking (missing field)", False, "Error message doesn't mention missing field")
                return False
        else:
            print_test_result("Create booking (missing field)", False, f"Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Create booking (missing field)", False, f"Exception: {str(e)}")
        return False

def test_get_bookings_all():
    """Test GET /api/bookings - List all bookings"""
    print("\n" + "="*80)
    print("TEST 8: Get All Bookings")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/bookings", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")
        
        if response.status_code == 200:
            data = response.json()
            if 'bookings' in data and isinstance(data['bookings'], list):
                print_test_result("Get all bookings", True, f"Found {len(data['bookings'])} bookings")
                return True
            else:
                print_test_result("Get all bookings", False, "Missing 'bookings' array in response")
                return False
        else:
            print_test_result("Get all bookings", False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Get all bookings", False, f"Exception: {str(e)}")
        return False

def test_get_bookings_by_date(date):
    """Test GET /api/bookings?date=YYYY-MM-DD - Filter by date"""
    print("\n" + "="*80)
    print("TEST 9: Get Bookings Filtered by Date")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/bookings?date={date}", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if 'bookings' in data and isinstance(data['bookings'], list):
                # Verify all bookings match the date
                all_match = all(b.get('date') == date for b in data['bookings'])
                if all_match:
                    print_test_result("Get bookings by date", True, f"Found {len(data['bookings'])} bookings for {date}")
                    return True
                else:
                    print_test_result("Get bookings by date", False, "Some bookings don't match the requested date")
                    return False
            else:
                print_test_result("Get bookings by date", False, "Missing 'bookings' array in response")
                return False
        else:
            print_test_result("Get bookings by date", False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Get bookings by date", False, f"Exception: {str(e)}")
        return False

def test_available_slots_with_date(date):
    """Test GET /api/available-slots?date=YYYY-MM-DD - Get taken slots"""
    print("\n" + "="*80)
    print("TEST 10: Get Available Slots with Date")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/available-slots?date={date}", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if 'taken' in data and isinstance(data['taken'], list):
                print_test_result("Get available slots (with date)", True, f"Taken slots: {data['taken']}")
                return True
            else:
                print_test_result("Get available slots (with date)", False, "Missing 'taken' array in response")
                return False
        else:
            print_test_result("Get available slots (with date)", False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Get available slots (with date)", False, f"Exception: {str(e)}")
        return False

def test_available_slots_without_date():
    """Test GET /api/available-slots - Missing date param returns 400"""
    print("\n" + "="*80)
    print("TEST 11: Get Available Slots without Date Parameter")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/available-slots", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print_test_result("Get available slots (no date)", True, f"Error: {data['error']}")
                return True
            else:
                print_test_result("Get available slots (no date)", False, "Missing error message in 400 response")
                return False
        else:
            print_test_result("Get available slots (no date)", False, f"Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Get available slots (no date)", False, f"Exception: {str(e)}")
        return False

def test_create_contact_success():
    """Test POST /api/contact - Submit contact form"""
    print("\n" + "="*80)
    print("TEST 12: Create Contact Message - Success Case")
    print("="*80)
    
    try:
        payload = {
            "name": "Emily Davis",
            "email": "emily.davis@example.com",
            "phone": "(316) 555-0987",
            "message": "I'd like to know more about your paint protection services and pricing for a 2022 BMW X5."
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'message' in data:
                print_test_result("Create contact message (success)", True, f"Message: {data['message']}")
                return True
            else:
                print_test_result("Create contact message (success)", False, "Missing success/message in response")
                return False
        else:
            print_test_result("Create contact message (success)", False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Create contact message (success)", False, f"Exception: {str(e)}")
        return False

def test_create_contact_missing_field():
    """Test POST /api/contact - Missing required field returns 400"""
    print("\n" + "="*80)
    print("TEST 13: Create Contact Message - Missing Required Field")
    print("="*80)
    
    try:
        # Missing 'message' field
        payload = {
            "name": "David Wilson",
            "email": "david.w@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print_test_result("Create contact message (missing field)", True, f"Error: {data['error']}")
                return True
            else:
                print_test_result("Create contact message (missing field)", False, "Missing error message in 400 response")
                return False
        else:
            print_test_result("Create contact message (missing field)", False, f"Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Create contact message (missing field)", False, f"Exception: {str(e)}")
        return False

def test_invalid_path():
    """Test invalid path returns 404"""
    print("\n" + "="*80)
    print("TEST 14: Invalid Path Returns 404")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/invalid-endpoint", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 404:
            data = response.json()
            if 'error' in data:
                print_test_result("Invalid path (404)", True, f"Error: {data['error']}")
                return True
            else:
                print_test_result("Invalid path (404)", False, "Missing error message in 404 response")
                return False
        else:
            print_test_result("Invalid path (404)", False, f"Expected 404, got {response.status_code}")
            return False
    except Exception as e:
        print_test_result("Invalid path (404)", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("JAMES HANNAH AUTO BODY - BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = []
    
    # Test 1: Health check
    results.append(("Health Check", test_health_check()))
    
    # Test 2-4: Estimates
    success, estimate_id = test_create_estimate_success()
    results.append(("Create Estimate (Success)", success))
    results.append(("Create Estimate (Missing Field)", test_create_estimate_missing_field()))
    results.append(("Get Estimates", test_get_estimates()))
    
    # Test 5-9: Bookings
    success, booking_date, booking_time = test_create_booking_success()
    results.append(("Create Booking (Success)", success))
    
    if booking_date and booking_time:
        results.append(("Create Booking (Conflict)", test_create_booking_conflict(booking_date, booking_time)))
        results.append(("Get Bookings by Date", test_get_bookings_by_date(booking_date)))
        results.append(("Get Available Slots (with date)", test_available_slots_with_date(booking_date)))
    else:
        results.append(("Create Booking (Conflict)", False))
        results.append(("Get Bookings by Date", False))
        results.append(("Get Available Slots (with date)", False))
    
    results.append(("Create Booking (Missing Field)", test_create_booking_missing_field()))
    results.append(("Get All Bookings", test_get_bookings_all()))
    
    # Test 10-11: Available slots
    results.append(("Get Available Slots (no date)", test_available_slots_without_date()))
    
    # Test 12-13: Contact
    results.append(("Create Contact (Success)", test_create_contact_success()))
    results.append(("Create Contact (Missing Field)", test_create_contact_missing_field()))
    
    # Test 14: Invalid path
    results.append(("Invalid Path (404)", test_invalid_path()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print("\n" + "="*80)
    print(f"TOTAL: {passed}/{total} tests passed ({passed*100//total}%)")
    print("="*80)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
