import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import { theme } from '../styles/theme';

const mockApprovals = [
  {
    id: '1',
    title: 'Software License Request',
    description: 'Adobe Creative Suite license for marketing team',
    requester: 'John Smith',
    amount: '$599/month',
    date: '2025-09-15',
    priority: 'Medium'
  },
  {
    id: '2',
    title: 'Travel Expense Approval',
    description: 'Business trip to client meeting in New York',
    requester: 'Sarah Johnson',
    amount: '$2,450',
    date: '2025-09-14',
    priority: 'High'
  },
  {
    id: '3',
    title: 'Equipment Purchase',
    description: 'New laptop for development team',
    requester: 'Mike Chen',
    amount: '$2,200',
    date: '2025-09-13',
    priority: 'Medium'
  },
  {
    id: '4',
    title: 'Marketing Campaign Budget',
    description: 'Q4 digital marketing campaign approval',
    requester: 'Emily Davis',
    amount: '$15,000',
    date: '2025-09-12',
    priority: 'High'
  },
  {
    id: '5',
    title: 'Office Supplies',
    description: 'Monthly office supplies order',
    requester: 'Tom Wilson',
    amount: '$350',
    date: '2025-09-11',
    priority: 'Low'
  }
];

export default function ApprovalScreen({ navigation }) {
  const [approvals, setApprovals] = useState(mockApprovals);

  const handleApproval = (id, action) => {
    Alert.alert(
      `${action} Request`,
      `Are you sure you want to ${action.toLowerCase()} this request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setApprovals(prev => prev.filter(item => item.id !== id));
            Alert.alert('Success', `Request ${action.toLowerCase()}ed successfully!`);
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

  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleItemPress = (item) => {
    navigation.navigate('RequestDetail', {
      item,
      showActions: true
    });
  };

  const renderApprovalItem = ({ item }) => (
    <Card style={styles.approvalCard} padding="lg">
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.priorityText}>{item.priority}</Text>
          </View>
        </View>

        <Text style={styles.description}>{truncateText(item.description)}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Requester</Text>
            <Text style={styles.detailValue}>{item.requester}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={[styles.detailValue, styles.amount]}>{item.amount}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <Button
          title="Approve"
          variant="success"
          size="sm"
          style={styles.actionButton}
          onPress={() => handleApproval(item.id, 'Approve')}
        />

        <Button
          title="Reject"
          variant="outline"
          size="sm"
          style={styles.actionButton}
          onPress={() => handleApproval(item.id, 'Reject')}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.main} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pending Approvals</Text>
        <Text style={styles.headerSubtitle}>{approvals.length} items require your attention</Text>
      </View>

      <FlatList
        data={approvals}
        keyExtractor={item => item.id}
        renderItem={renderApprovalItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.sm
  },
  headerTitle: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary
  },
  headerSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs
  },
  listContainer: {
    padding: theme.spacing.md
  },
  approvalCard: {
    marginBottom: theme.spacing.md
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: theme.spacing.sm
  },
  priorityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full
  },
  priorityText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    textTransform: 'uppercase'
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20
  },
  detailsContainer: {
    marginBottom: theme.spacing.md
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs
  },
  detailLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  detailValue: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  amount: {
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.success.main
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm
  },
  actionButton: {
    flex: 1
  }
});