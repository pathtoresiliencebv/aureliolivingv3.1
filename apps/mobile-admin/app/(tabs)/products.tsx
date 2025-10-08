import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Package, Plus, Edit, Trash2 } from 'lucide-react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Sofa',
    price: 1299.00,
    stock: 5,
    category: 'Furniture',
  },
  {
    id: '2',
    name: 'Coffee Table',
    price: 399.00,
    stock: 12,
    category: 'Furniture',
  },
  {
    id: '3',
    name: 'Floor Lamp',
    price: 199.00,
    stock: 8,
    category: 'Lighting',
  },
  {
    id: '4',
    name: 'Throw Pillow',
    price: 29.99,
    stock: 45,
    category: 'Accessories',
  },
];

export default function ProductsScreen() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const getStockColor = (stock: number) => {
    if (stock === 0) return '#ef4444';
    if (stock < 10) return '#f59e0b';
    return '#10b981';
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        <Package color="#0ea5e9" size={32} />
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={[styles.stockBadge, { backgroundColor: `${getStockColor(item.stock)}20` }]}>
            <Text style={[styles.stockText, { color: getStockColor(item.stock) }]}>
              {item.stock} in stock
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.productActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Edit color="#0ea5e9" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Trash2 color="#ef4444" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Products</Text>
          <Text style={styles.subtitle}>{products.length} products</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Package color="#94a3b8" size={48} />
            <Text style={styles.emptyText}>No products yet</Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Add Your First Product</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#0ea5e9',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c4a6e',
  },
  productCategory: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '600',
  },
  productActions: {
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

