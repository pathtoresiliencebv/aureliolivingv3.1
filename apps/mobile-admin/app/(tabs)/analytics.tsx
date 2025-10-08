import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package } from 'lucide-react-native';

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

const STATS: Stat[] = [
  {
    label: 'Revenue',
    value: '$45,280',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: '#0ea5e9',
  },
  {
    label: 'Orders',
    value: '342',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: '#f59e0b',
  },
  {
    label: 'Customers',
    value: '1,284',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: '#10b981',
  },
  {
    label: 'Products',
    value: '89',
    change: '+3',
    trend: 'up',
    icon: Package,
    color: '#8b5cf6',
  },
];

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Last 30 days</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${stat.color}20` }]}>
                <stat.icon color={stat.color} size={20} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: '#dcfce7' }]}>
                <TrendingUp color="#10b981" size={12} />
                <Text style={[styles.changeText, { color: '#10b981' }]}>{stat.change}</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Revenue Chart Placeholder */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Revenue Overview</Text>
        <View style={styles.chartPlaceholder}>
          <TrendingUp color="#0ea5e9" size={48} />
          <Text style={styles.chartText}>Chart coming soon</Text>
        </View>
      </View>

      {/* Top Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        {[
          { name: 'Modern Sofa', sales: 45, revenue: '$58,455' },
          { name: 'Coffee Table', sales: 32, revenue: '$12,768' },
          { name: 'Floor Lamp', sales: 28, revenue: '$5,572' },
        ].map((product, index) => (
          <View key={index} style={styles.productRow}>
            <View style={styles.productRank}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMeta}>{product.sales} sales</Text>
            </View>
            <Text style={styles.productRevenue}>{product.revenue}</Text>
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  chartText: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 12,
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  productRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0c4a6e',
  },
  productMeta: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  productRevenue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
});

