import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import { theme } from '../styles/theme';

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
      case 'High': return theme.colors.error.main;
      case 'Medium': return theme.colors.warning.main;
      case 'Low': return theme.colors.success.main;
      default: return theme.colors.secondary.main;
    }
  };

  const getStatusColor = (status) => {
    return status === 'Approved' ? theme.colors.success.main : theme.colors.error.main;
  };

  const getStatusIcon = (status) => {
    return status === 'Approved' ? '✓' : '✗';
  };

  const renderDetailSection = (title, content, isImportant = false) => (
    <Card style={styles.detailSection} padding="lg">
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={[styles.sectionContent, isImportant && styles.importantContent]}>
        {content}
      </Text>
    </Card>
  );

  const renderAdditionalInfo = () => (
    <Card style={styles.additionalInfoContainer} padding="lg">
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
    </Card>
  );

  const renderTimeline = () => (
    <Card style={styles.timelineContainer} padding="lg">
      <Text style={styles.timelineTitle}>Request Timeline</Text>

      <View style={styles.timelineItem}>
        <View style={[styles.timelineDot, { backgroundColor: theme.colors.primary.main }]} />
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
            <View style={[styles.timelineDot, { backgroundColor: theme.colors.warning.main }]} />
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
          <View style={[styles.timelineDot, { backgroundColor: theme.colors.warning.main }]} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Pending Review</Text>
            <Text style={styles.timelineDate}>Current</Text>
            <Text style={styles.timelineDescription}>
              Awaiting manager approval
            </Text>
          </View>
        </View>
      )}
    </Card>
  );

  const renderSpecificDetails = () => {
    if (item.title.includes('Travel')) {
      return (
        <Card style={styles.additionalInfoContainer} padding="lg">
          <Text style={styles.additionalInfoTitle}>Travel Details</Text>
          <Text style={styles.sectionContent}>
            • Destination: New York, NY{'\n'}
            • Duration: 3 days{'\n'}
            • Purpose: Client meeting and contract negotiation{'\n'}
            • Hotel: The Plaza Hotel{'\n'}
            • Flight: Round trip from San Francisco{'\n'}
            • Meals: $75/day allowance included
          </Text>
        </Card>
      );
    }

    if (item.title.includes('Software')) {
      return (
        <Card style={styles.additionalInfoContainer} padding="lg">
          <Text style={styles.additionalInfoTitle}>License Details</Text>
          <Text style={styles.sectionContent}>
            • License Type: Annual subscription{'\n'}
            • Users: 5 marketing team members{'\n'}
            • Features: Full Creative Suite access{'\n'}
            • Renewal: Auto-renewal enabled{'\n'}
            • Support: 24/7 premium support included{'\n'}
            • Training: Online training modules included
          </Text>
        </Card>
      );
    }

    if (item.title.includes('Equipment')) {
      return (
        <Card style={styles.additionalInfoContainer} padding="lg">
          <Text style={styles.additionalInfoTitle}>Equipment Specifications</Text>
          <Text style={styles.sectionContent}>
            • Model: MacBook Pro 16-inch{'\n'}
            • Processor: M3 Pro chip{'\n'}
            • Memory: 32GB unified memory{'\n'}
            • Storage: 1TB SSD{'\n'}
            • Warranty: 3-year AppleCare+{'\n'}
            • Delivery: Express shipping included
          </Text>
        </Card>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.secondary} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>‹</Text>
          <Text style={styles.backButtonLabel}>Back</Text>
        </TouchableOpacity>

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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

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
            <Button
              title="✓ Approve Request"
              variant="success"
              size="lg"
              onPress={() => handleApproval('Approve')}
              style={styles.actionButton}
            />

            <Button
              title="✗ Reject Request"
              variant="error"
              size="lg"
              onPress={() => handleApproval('Reject')}
              style={styles.actionButton}
            />
          </View>
        )}

        {!showActions && item.status === 'Rejected' && (
          <View style={styles.actionSection}>
            <Button
              title="Create Similar Request"
              variant="primary"
              size="lg"
              onPress={handleResubmit}
              style={styles.actionButton}
            />
          </View>
        )}

        {!showActions && item.status === 'Approved' && (
          <Card style={styles.statusSection} padding="lg">
            <View style={styles.successBadge}>
              <Text style={styles.successText}>✓ This request has been approved and processed</Text>
            </View>
          </Card>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary
  },
  header: {
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.sm
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.xs
  },
  backButtonText: {
    fontSize: 28,
    color: theme.colors.primary.main,
    marginRight: theme.spacing.xs
  },
  backButtonLabel: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary.main,
    fontWeight: theme.typography.weights.medium
  },
  titleContainer: {
    marginBottom: theme.spacing.sm
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    lineHeight: 30
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full
  },
  priorityText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    textTransform: 'uppercase'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    minWidth: 100
  },
  statusIcon: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    marginRight: theme.spacing.xs
  },
  statusText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    textTransform: 'uppercase',
    flexShrink: 0
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: theme.spacing.lg
  },
  detailSection: {
    marginBottom: theme.spacing.md
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  sectionContent: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
    lineHeight: 24,
    fontWeight: theme.typography.weights.medium
  },
  importantContent: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.success.main
  },
  additionalInfoContainer: {
    marginBottom: theme.spacing.md
  },
  additionalInfoTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md
  },
  infoLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  infoValue: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold
  },
  timelineContainer: {
    marginBottom: theme.spacing.md
  },
  timelineTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    alignItems: 'flex-start'
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: theme.spacing.sm
  },
  timelineContent: {
    flex: 1
  },
  timelineLabel: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: 2
  },
  timelineDate: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs
  },
  timelineDescription: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20
  },
  actionSection: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm
  },
  actionButton: {
    width: '100%'
  },
  statusSection: {
    marginTop: theme.spacing.xl
  },
  successBadge: {
    backgroundColor: theme.colors.success.light + '20',
    borderColor: theme.colors.success.light,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center'
  },
  successText: {
    color: theme.colors.success.dark,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    textAlign: 'center'
  }
});