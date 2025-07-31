import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const fetchStats = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (e) {
    return null;
  }
};

const AdminDashboard: React.FC = () => {
  const [userStats, setUserStats] = useState<any>(null);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [usageStats, setUsageStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchStats('/api/admin/stats/users'),
      fetchStats('/api/admin/stats/system'),
      fetchStats('/api/admin/stats/usage'),
    ]).then(([users, system, usage]) => {
      setUserStats(users);
      setSystemStats(system);
      setUsageStats(usage);
      setLoading(false);
    }).catch((err) => {
      setError('Failed to load admin dashboard data.');
      setLoading(false);
    });
  }, []);

  if (loading) return <Box sx={{ mt: 4, maxWidth: '1440px', mx: 'auto', p: { xs: 1, sm: 2, md: 4 }, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}><Typography>Loading...</Typography></Box>;
  if (error) return <Box sx={{ mt: 4, maxWidth: '1440px', mx: 'auto', p: { xs: 1, sm: 2, md: 4 }, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box sx={{ mt: 4, maxWidth: '1440px', mx: 'auto', p: { xs: 1, sm: 2, md: 4 }, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Admin Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* User Management Overview */}
        <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">User Management</Typography>
              <Typography>Total Users: {userStats?.total ?? '-'}</Typography>
              <Typography>Admins: {userStats?.admins ?? '-'}</Typography>
              <Typography>Active Users: {userStats?.active ?? '-'}</Typography>
              <Typography>Recent Signups: {userStats?.recentSignups ?? '-'}</Typography>
              <Button variant="contained" sx={{ mt: 2 }} fullWidth>Manage Users</Button>
            </CardContent>
          </Card>
        </Box>
        {/* System Health */}
        <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">System Health</Typography>
              <Typography>API Status: <span style={{ color: systemStats?.apiStatus === 'Online' ? 'green' : 'red' }}>{systemStats?.apiStatus ?? '-'}</span></Typography>
              <Typography>Server Uptime: {systemStats?.serverUptime ?? '-'}</Typography>
              <Typography>Recent Errors: {systemStats?.recentErrors ?? '-'}</Typography>
              <Button variant="outlined" sx={{ mt: 2 }} fullWidth>View Logs</Button>
            </CardContent>
          </Card>
        </Box>
        {/* Usage Analytics */}
        <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Usage Analytics</Typography>
              <Typography>Active Users (24h): {usageStats?.activeUsers24h ?? '-'}</Typography>
              <Typography>New Signups (7d): {usageStats?.newSignups7d ?? '-'}</Typography>
              <Typography>Failed Logins (24h): {usageStats?.failedLogins24h ?? '-'}</Typography>
              <Button variant="outlined" sx={{ mt: 2 }} fullWidth>Analytics</Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Quick Links */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained">User Management</Button>
        <Button variant="contained">System Logs</Button>
        <Button variant="contained">Settings</Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 