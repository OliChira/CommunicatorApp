import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function RequestDetailScreen({ route, navigation }) {
  const { item, showActions = false } = route.params;

  const handleApproval = (action) => {
    Alert.alert(
      `${action} Request`,
      `Are you sure you want to ${action.toLowerCase()} this request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', `Request ${action.toLowerCase()}ed successfully!`, [
              {
                text: 'OK',
                onPress: () => navigation.goBack()
              }
            ]);
          }
        }
      ]
    );
  };

  const handleResubmit = () => {
    Alert.alert(
      'Resubmit Request',
      'Would you like to create a new request based on this one?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create New Request',
          onPress: () => {
            Alert.alert('Success', 'New request created successfully!');
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa502';
      case 'Low': return '#2ed573';
      default: return '#57606f';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Approved' ? '#28a745' : '#dc3545';
  };

  const getStatusIcon = (status) => {
    return status === 'Approved' ? '✓' : '✗';
  };

  const renderDetailSection = (title, content, isImportant = false) => (
    <View style={styles.detailSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={[styles.sectionContent, isImportant && styles.importantContent]}>
        {content}
      </Text>
    </View>
  );

  const renderAdditionalInfo = () => (
    <View style={styles.additionalInfoContainer}>
      <Text style={styles.additionalInfoTitle}>Request Information</Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Request ID</Text>
          <Text style={styles.infoValue}>REQ-{item.id.padStart(6, '0')}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Department</Text>
          <Text style={styles.infoValue}>Operations</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>
            {item.title.includes('Software') ? 'Software License' :
             item.title.includes('Travel') || item.title.includes('Dinner') ? 'Travel & Expense' :
             item.title.includes('Equipment') || item.title.includes('Furniture') ? 'Equipment' :
             item.title.includes('Marketing') || item.title.includes('Materials') ? 'Marketing' :
             item.title.includes('Training') || item.title.includes('Conference') ? 'Training' : 'General'}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Approval Level</Text>
          <Text style={styles.infoValue}>Manager</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Budget Code</Text>
          <Text style={styles.infoValue}>BUD-2025-{Math.floor(Math.random() * 1000)}</Text>
        </View>

        {showActions && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Expected Start</Text>
            <Text style={styles.infoValue}>
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </Text>
          </View>
        )}

        {!showActions && item.processedDate && (
          <>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Processing Time</Text>
              <Text style={styles.infoValue}>
                {Math.ceil((new Date(item.processedDate) - new Date(item.date)) / (1000 * 60 * 60 * 24))} days
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Approved By</Text>
              <Text style={styles.infoValue}>John Doe (Manager)</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Budget Impact</Text>
              <Text style={styles.infoValue}>
                {item.status === 'Approved' ? 'Applied' : 'No Impact'}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );

  const renderTimeline = () => (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Request Timeline</Text>

      <View style={styles.timelineItem}>
        <View style={[styles.timelineDot, { backgroundColor: '#007bff' }]} />
        <View style={styles.timelineContent}>
          <Text style={styles.timelineLabel}>Request Submitted</Text>
          <Text style={styles.timelineDate}>{item.date}</Text>
          <Text style={styles.timelineDescription}>
            Request submitted by {item.requester}
          </Text>
        </View>
      </View>

      {!showActions && (
        <>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: '#ffc107' }]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineLabel}>Under Review</Text>
              <Text style={styles.timelineDate}>
                {new Date(new Date(item.date).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
              </Text>
              <Text style={styles.timelineDescription}>
                Request forwarded to approval manager
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: getStatusColor(item.status) }]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineLabel}>{item.status}</Text>
              <Text style={styles.timelineDate}>{item.processedDate}</Text>
              <Text style={styles.timelineDescription}>
                Request {item.status.toLowerCase()} by manager
              </Text>
            </View>
          </View>
        </>
      )}

      {showActions && (
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: '#ffc107' }]} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Pending Review</Text>
            <Text style={styles.timelineDate}>Current</Text>
            <Text style={styles.timelineDescription}>
              Awaiting manager approval
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderSpecificDetails = () => {
    if (item.title.includes('Travel')) {
      return (
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoTitle}>Travel Details</Text>
          <Text style={styles.sectionContent}>
            • Destination: New York, NY{'\n'}
            • Duration: 3 days{'\n'}
            • Purpose: Client meeting and contract negotiation{'\n'}
            • Hotel: The Plaza Hotel{'\n'}
            • Flight: Round trip from San Francisco{'\n'}
            • Meals: $75/day allowance included
          </Text>
        </View>
      );
    }

    if (item.title.includes('Software')) {
      return (
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoTitle}>License Details</Text>
          <Text style={styles.sectionContent}>
            • License Type: Annual subscription{'\n'}
            • Users: 5 marketing team members{'\n'}
            • Features: Full Creative Suite access{'\n'}
            • Renewal: Auto-renewal enabled{'\n'}
            • Support: 24/7 premium support included{'\n'}
            • Training: Online training modules included
          </Text>
        </View>
      );
    }

    if (item.title.includes('Equipment')) {
      return (
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoTitle}>Equipment Specifications</Text>
          <Text style={styles.sectionContent}>
            • Model: MacBook Pro 16-inch{'\n'}
            • Processor: M3 Pro chip{'\n'}
            • Memory: 32GB unified memory{'\n'}
            • Storage: 1TB SSD{'\n'}
            • Warranty: 3-year AppleCare+{'\n'}
            • Delivery: Express shipping included
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>

          {showActions && item.priority && (
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
              <Text style={styles.priorityText}>{item.priority} Priority</Text>
            </View>
          )}

          {!showActions && item.status && (
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {renderDetailSection('Description', item.description)}
        {renderDetailSection('Amount', item.amount, true)}
        {renderDetailSection('Requester', item.requester)}
        {renderDetailSection('Request Date', item.date)}
        {!showActions && item.processedDate && renderDetailSection('Processed Date', item.processedDate)}

        {renderAdditionalInfo()}
        {renderSpecificDetails()}
        {renderTimeline()}

        {showActions && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[styles.actionButton, styles.approveButton]}
              onPress={() => handleApproval('Approve')}
            >
              <Text style={styles.actionButtonText}>✓ Approve Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleApproval('Reject')}
            >
              <Text style={styles.actionButtonText}>✗ Reject Request</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showActions && item.status === 'Rejected' && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.resubmitButton}
              onPress={handleResubmit}
            >
              <Text style={styles.resubmitButtonText}>🔄 Create Similar Request</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showActions && item.status === 'Approved' && (
          <View style={styles.statusSection}>
            <View style={styles.successBadge}>
              <Text style={styles.successText}>✓ This request has been approved and processed</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  titleContainer: {
    marginBottom: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
    lineHeight: 30
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  priorityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  statusIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  content: {
    padding: 20
  },
  detailSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8
  },
  sectionContent: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24
  },
  importantContent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745'
  },
  additionalInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16
  },
  infoLabel: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 4
  },
  infoValue: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '600'
  },
  timelineContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start'
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12
  },
  timelineContent: {
    flex: 1
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 2
  },
  timelineDate: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4
  },
  timelineDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20
  },
  actionSection: {
    marginTop: 20,
    gap: 12
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  approveButton: {
    backgroundColor: '#28a745'
  },
  rejectButton: {
    backgroundColor: '#dc3545'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  resubmitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  resubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusSection: {
    marginTop: 20
  },
  successBadge: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  successText: {
    color: '#155724',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});