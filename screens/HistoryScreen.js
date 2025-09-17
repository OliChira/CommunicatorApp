import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockHistory = [
  {
    id: '1',
    title: 'Conference Registration',
    description: 'React Native conference ticket',
    requester: 'Alex Brown',
    amount: '$799',
    date: '2025-09-10',
    status: 'Approved',
    processedDate: '2025-09-10'
  },
  {
    id: '2',
    title: 'Team Lunch Budget',
    description: 'Monthly team building lunch',
    requester: 'Lisa Wang',
    amount: '$300',
    date: '2025-09-08',
    status: 'Approved',
    processedDate: '2025-09-09'
  },
  {
    id: '3',
    title: 'Cloud Storage Upgrade',
    description: 'Additional cloud storage for project files',
    requester: 'David Kim',
    amount: '$99/month',
    date: '2025-09-07',
    status: 'Rejected',
    processedDate: '2025-09-08'
  },
  {
    id: '4',
    title: 'Training Course',
    description: 'Advanced JavaScript certification course',
    requester: 'Jennifer Lee',
    amount: '$450',
    date: '2025-09-05',
    status: 'Approved',
    processedDate: '2025-09-06'
  },
  {
    id: '5',
    title: 'Office Furniture',
    description: 'Ergonomic chair for remote worker',
    requester: 'Robert Taylor',
    amount: '$800',
    date: '2025-09-03',
    status: 'Approved',
    processedDate: '2025-09-04'
  },
  {
    id: '6',
    title: 'Software Subscription',
    description: 'Design tool subscription renewal',
    requester: 'Maria Garcia',
    amount: '$29/month',
    date: '2025-09-01',
    status: 'Rejected',
    processedDate: '2025-09-02'
  },
  {
    id: '7',
    title: 'Client Dinner',
    description: 'Business dinner with potential client',
    requester: 'Chris Wilson',
    amount: '$180',
    date: '2025-08-30',
    status: 'Approved',
    processedDate: '2025-08-31'
  },
  {
    id: '8',
    title: 'Marketing Materials',
    description: 'Printed brochures and business cards',
    requester: 'Anna Martinez',
    amount: '$250',
    date: '2025-08-28',
    status: 'Approved',
    processedDate: '2025-08-29'
  }
];

export default function HistoryScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [history, setHistory] = useState(mockHistory);

  const filteredHistory = filter === 'All'
    ? history
    : history.filter(item => item.status === filter);

  const getStatusColor = (status) => {
    return status === 'Approved' ? '#28a745' : '#dc3545';
  };

  const getStatusIcon = (status) => {
    return status === 'Approved' ? '✓' : '✗';
  };

  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleItemPress = (item) => {
    navigation.navigate('RequestDetail', {
      item,
      showActions: false
    });
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyCard}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <Text style={styles.statusText}>{item.status}</Text>
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
        <Text style={styles.detailLabel}>Requested:</Text>
        <Text style={styles.detailValue}>{item.date}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Processed:</Text>
        <Text style={styles.detailValue}>{item.processedDate}</Text>
      </View>

      <View style={styles.tapHint}>
        <Text style={styles.tapHintText}>Tap to view details</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (filterType) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterType && styles.activeFilterButton
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === filterType && styles.activeFilterButtonText
      ]}>
        {filterType}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Approval History</Text>
        <Text style={styles.headerSubtitle}>
          {filteredHistory.length} {filter.toLowerCase()} requests
        </Text>
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('All')}
        {renderFilterButton('Approved')}
        {renderFilterButton('Rejected')}
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={item => item.id}
        renderItem={renderHistoryItem}
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6'
  },
  activeFilterButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff'
  },
  filterButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500'
  },
  activeFilterButtonText: {
    color: '#fff'
  },
  listContainer: {
    padding: 16
  },
  historyCard: {
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4
  },
  statusText: {
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
    marginBottom: 6
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