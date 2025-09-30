import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Card from '../components/Card';
import { theme } from '../styles/theme';

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
    return status === 'Approved' ? theme.colors.success.main : theme.colors.error.main;
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
    <Card style={styles.historyCard} padding="lg">
      <TouchableOpacity
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
            <Text style={styles.detailLabel}>Requested</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Processed</Text>
            <Text style={styles.detailValue}>{item.processedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.main} />

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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    borderWidth: 1,
    borderColor: theme.colors.border.medium
  },
  activeFilterButton: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main
  },
  filterButtonText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium
  },
  activeFilterButtonText: {
    color: theme.colors.text.inverse
  },
  listContainer: {
    padding: theme.spacing.md
  },
  historyCard: {
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full
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
    textTransform: 'uppercase'
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20
  },
  detailsContainer: {
    marginBottom: theme.spacing.sm
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
  }
});