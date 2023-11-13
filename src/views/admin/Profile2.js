import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:33321/api/staff/detail/${storedUserId}`);
        const data = await response.json();
        setUserInfo(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [storedUserId]);

  return (
    <div>
      <h2>Thông tin tài khoản</h2>
      <h2>Thông tin tài khoản</h2>
      <h2>Thông tin tài khoản</h2>
      <h2>Thông tin tài khoản</h2>
      <h2>Thông tin tài khoản</h2>
      {userInfo ? (
        <>
          <p>ID: {storedUserId}</p>
          <p>Email: {userInfo.data.email}</p>
          {/* Hiển thị các thông tin khác của tài khoản */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;