import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

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
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa502';
      case 'Low': return '#2ed573';
      default: return '#57606f';
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
    <TouchableOpacity
      style={styles.approvalCard}
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

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Requester:</Text>
        <Text style={styles.detailValue}>{item.requester}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Amount:</Text>
        <Text style={[styles.detailValue, styles.amount]}>{item.amount}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailValue}>{item.date}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => handleApproval(item.id, 'Approve')}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleApproval(item.id, 'Reject')}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tapHint}>
        <Text style={styles.tapHintText}>Tap to view details</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
    </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4
  },
  listContainer: {
    padding: 16
  },
  approvalCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    flex: 1,
    marginRight: 8
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
    lineHeight: 20
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  detailLabel: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: 14,
    color: '#212529'
  },
  amount: {
    fontWeight: 'bold',
    color: '#28a745'
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  approveButton: {
    backgroundColor: '#28a745'
  },
  rejectButton: {
    backgroundColor: '#dc3545'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  tapHint: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f8f9fa',
    alignItems: 'center'
  },
  tapHintText: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic'
  }
});