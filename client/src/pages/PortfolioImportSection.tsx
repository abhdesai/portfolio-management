import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Divider, List, ListItem, ListItemText, Chip, IconButton, Card, CardContent, LinearProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import apiCall from '../utils/api';
import { useNotification } from '../contexts/NotificationContext';

const PortfolioImportSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();
  const [fileName, setFileName] = useState<string>("");

  // Get user-specific sessionStorage keys
  const getStorageKey = (baseKey: string) => {
    const user = sessionStorage.getItem('user');
    if (!user) return baseKey;
    const userData = JSON.parse(user);
    return `${baseKey}_user_${userData.id}`;
  };

  // Clear any leftover sessionStorage data on mount (security: prevent data leakage between users)
  useEffect(() => {
    // Check if we have a valid token (user is logged in)
    const token = sessionStorage.getItem('token');
    if (!token) {
      // No token means no user session, clear any leftover data
      sessionStorage.removeItem('portfolioUploadStatus');
      sessionStorage.removeItem('portfolioUploadFile');
      return;
    }
    
    // Only restore data if user is authenticated
    const saved = sessionStorage.getItem(getStorageKey('portfolioUploadStatus'));
    if (saved) setStatus(JSON.parse(saved));
  }, []);

  // Save status to sessionStorage after upload
  useEffect(() => {
    if (status) {
      sessionStorage.setItem(getStorageKey('portfolioUploadStatus'), JSON.stringify(status));
    }
  }, [status]);

  // Restore file info from sessionStorage on mount (only if authenticated)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return; // Don't restore file info if not authenticated
    
  }, []);

  // Save file info to sessionStorage after upload
  useEffect(() => {
    if (file) {
      sessionStorage.setItem(getStorageKey('portfolioUploadFile'), JSON.stringify({ name: file.name, type: file.type }));
    }
  }, [file]);

  // On mount, restore file name for display ONLY (do not set file from sessionStorage)
  useEffect(() => {
    const savedName = sessionStorage.getItem("lastUploadFileName");
    if (savedName) setFileName(savedName);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      sessionStorage.setItem("lastUploadFileName", e.target.files[0].name);
      setStatus(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
      sessionStorage.setItem("lastUploadFileName", e.dataTransfer.files[0].name);
      setStatus(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const doUpload = async (mode: 'full' | 'incremental') => {
    // 2. Detect if file input is available
    if (!file) {
      showNotification("Please select the file again before uploading.", "error");
      return;
    }
    setLoading(true);
    setConfirmOpen(false);
    setProgress(0);
    setError(null);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', mode);
      // Optionally show progress bar (simulate for now)
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 20 + 10;
        setProgress(Math.min(prog, 98));
      }, 250);
      // Get JWT from sessionStorage if present
      const token = sessionStorage.getItem('token');
      const { data, error } = await apiCall('/api/portfolios/upload', {
        method: 'POST',
        data: formData,
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data'
        }
      });
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
      if (error) {
        setError(error.message || 'Upload failed');
        showNotification(error.message || 'Upload failed', 'error');
        return;
      }
      setStatus({
        portfoliosCreated: data.portfoliosCreated,
        transactionsCreated: data.transactionsCreated,
        details: data.details || [],
        mode: data.mode
      });
      showNotification('Upload successful!', 'success');
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Upload failed');
      showNotification(err?.message || 'Upload failed', 'error');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName(""); // Clear file name display
    setStatus(null);
    setError(null);
    sessionStorage.removeItem(getStorageKey('portfolioUploadStatus'));
    sessionStorage.removeItem(getStorageKey('portfolioUploadFile'));
    sessionStorage.removeItem("lastUploadFileName"); // Clear last uploaded file name
  };

  // When showing an error for invalid file format or row, use a message like:
  const formatErrorMessage = 'The uploaded Excel file format is incorrect. Please ensure your file has the columns: Portfolio, Description, Ticker, Type, Date, Price, Quantity (in this order). See the sample format above.';

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '80vw', width: '100%', mx: 'auto' }}>
      {/* Show warning if file name is present but file input is empty */}
      {fileName && !file && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          For security, please re-select the file before uploading.
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Import or update your investment portfolios by uploading an Excel file. You can reset your entire portfolio or just add new transactions.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          <b>Tip:</b> Use Full Upload for a fresh start, or Incremental to keep your existing data and just add or update transactions.
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Excel Upload Format
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Please upload an Excel file (.xlsx) with the following columns in this exact order:
          </Typography>
          <Box sx={{ overflowX: 'auto', mb: 1, width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Portfolio</th>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Description</th>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Ticker</th>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Type</th>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Date</th>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Price</th>
                  <th style={{ border: '1px solid #ccc', padding: 4 }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>MyPortfolio</td>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>My strategy</td>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>AAPL</td>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>buy</td>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>2024-01-01</td>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>150</td>
                  <td style={{ border: '1px solid #ccc', padding: 4 }}>10</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Typography variant="caption" color="text.secondary">
            <strong>Note:</strong> The <code>Description</code> column is optional, but the column must be present (can be blank). All other columns are required and must be in this order.
          </Typography>
        </Box>
        {/* Drag-and-drop area */}
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={{
            border: '2px dashed',
            borderColor: file ? 'success.main' : 'grey.400',
            borderRadius: 2,
            p: 3,
            mb: 2,
            textAlign: 'center',
            background: file ? 'rgba(76, 175, 80, 0.05)' : 'rgba(0,0,0,0.01)',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            position: 'relative',
            outline: 'none',
            '&:hover': { borderColor: 'primary.main' }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xls,.xlsx"
            hidden
            onChange={handleFileChange}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: file ? 'success.main' : 'grey.500', mb: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {file ? `File ready to upload! ${file.name}` : fileName ? `File previously selected: ${fileName}` : 'Drag & drop Excel file here or click to browse'}
          </Typography>
          {file && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Chip label={file.name} color="success" size="small" />
              <Button size="small" onClick={handleRemoveFile} variant="outlined" color="primary">
                Remove
              </Button>
            </Box>
          )}
        </Box>
        {/* Progress bar below buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<WarningAmberIcon />}
            disabled={!file || loading}
            onClick={() => setConfirmOpen(true)}
          >
            Full Upload
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<InfoOutlinedIcon />}
            disabled={!file || loading}
            onClick={() => doUpload('incremental')}
          >
            Incremental Upload
          </Button>
        </Box>
        {loading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {/* Confirmation Dialog for Full Upload */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Confirm Full Upload</DialogTitle>
          <DialogContent>
            <Alert severity="error" icon={<WarningAmberIcon />} sx={{ mb: 2 }}>
              All current portfolios and transactions will be erased and replaced with the data from your file.<br />
              <b>Please proceed only if you are sure. This cannot be undone.</b>
            </Alert>
            <Typography>
              Are you sure you want to proceed with a full upload?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="inherit">Cancel</Button>
            <Button onClick={() => doUpload('full')} color="error" variant="contained">Yes, Reset & Upload</Button>
          </DialogActions>
        </Dialog>
        {/* Modern Result Card */}
        {status && (
          <Card sx={{ mt: 3, background: 'rgba(76,175,80,0.07)', border: '1px solid #c8e6c9', position: 'relative' }}>
            <CardContent>
              <IconButton
                aria-label="close"
                onClick={() => { setStatus(null); sessionStorage.removeItem(getStorageKey('portfolioUploadStatus')); setFile(null); sessionStorage.removeItem(getStorageKey('portfolioUploadFile')); sessionStorage.removeItem("lastUploadFileName"); }}
                sx={{ position: 'absolute', top: 8, right: 8 }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Upload Complete
                </Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Portfolios created</Typography>
                  <Typography variant="h6" color="success.main">{status.portfoliosCreated}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Transactions created</Typography>
                  <Typography variant="h6" color="success.main">{status.transactionsCreated}</Typography>
                </Box>
              </Box>
              <List dense>
                {(() => {
                  // Find the longest portfolio name to determine column width
                  const maxNameLength = Math.max(...status.details.map((p: any) => p.name.length));
                  const columnWidth = Math.max(maxNameLength * 8, 120); // Minimum 120px, scale with name length
                  return status.details.map((p: any) => (
                    <ListItem key={p.name} sx={{ pl: 0 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 600, 
                                width: columnWidth,
                                minWidth: columnWidth,
                                flexShrink: 0,
                                textAlign: 'left'
                              }}
                            >
                              {p.name}:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 140 }}>
                                <Typography variant="body2" sx={{ textAlign: 'right', minWidth: 28, fontWeight: 600 }}>
                                  {p.added}
                                </Typography>
                                <Typography variant="body2" sx={{ minWidth: 90, textAlign: 'left', ml: 0.5 }}>
                                  Transactions added
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mx: 0.5 }}>,</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 140 }}>
                                <Typography variant="body2" sx={{ textAlign: 'right', minWidth: 28, fontWeight: 600 }}>
                                  {p.updated}
                                </Typography>
                                <Typography variant="body2" sx={{ minWidth: 90, textAlign: 'left', ml: 0.5 }}>
                                  Transactions updated
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ));
                })()}
              </List>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Box>
  );
};

export default PortfolioImportSection; 