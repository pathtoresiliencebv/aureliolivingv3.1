import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back to Aurelio</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
          <DollarSign color="#0ea5e9" size={24} />
          <Text style={styles.statValue}>$12,450</Text>
          <Text style={styles.statLabel}>Today's Sales</Text>
          <Text style={[styles.statChange, { color: '#10b981' }]}>+12.5%</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
          <ShoppingCart color="#f59e0b" size={24} />
          <Text style={styles.statValue}>42</Text>
          <Text style={styles.statLabel}>New Orders</Text>
          <Text style={[styles.statChange, { color: '#10b981' }]}>+8.2%</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#d1fae5' }]}>
          <Users color="#10b981" size={24} />
          <Text style={styles.statValue}>284</Text>
          <Text style={styles.statLabel}>Customers</Text>
          <Text style={[styles.statChange, { color: '#10b981' }]}>+15.3%</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#fce7f3' }]}>
          <TrendingUp color="#ec4899" size={24} />
          <Text style={styles.statValue}>$45.2K</Text>
          <Text style={styles.statLabel}>This Month</Text>
          <Text style={[styles.statChange, { color: '#10b981' }]}>+22.1%</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]}>
          <Text style={styles.actionButtonOutlineText}>Process Order</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Orders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {[1, 2, 3].map((order) => (
          <View key={order} style={styles.orderCard}>
            <View>
              <Text style={styles.orderNumber}>Order #100{order}</Text>
              <Text style={styles.orderCustomer}>John Doe</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderAmount}>$125.00</Text>
              <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>Pending</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c4a6e',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c4a6e',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0ea5e9',
  },
  actionButtonOutlineText: {
    color: '#0ea5e9',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c4a6e',
  },
  orderCustomer: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  orderStatus: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  orderStatusText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
});

