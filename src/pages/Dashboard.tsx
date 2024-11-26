import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import InventoryTable from '../components/inventory/InventoryTable';
import AddItemModal from '../components/inventory/AddItemModal';
import { InventoryItem } from '../types/inventory';
import { mockInventory } from '../data/mockData';

export default function Dashboard() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const itemWithId = {
      ...newItem,
      id: Date.now().toString(),
    };
    setItems([...items, itemWithId]);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItem = (updatedItem: Omit<InventoryItem, 'id'>) => {
    if (editingItem) {
      setItems(items.map(item =>
        item.id === editingItem.id
          ? { ...updatedItem, id: item.id }
          : item
      ));
      setEditingItem(undefined);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
            <button
              onClick={() => {
                setEditingItem(undefined);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Items"
              value={items.length.toString()}
              description="Items in inventory"
            />
            <StatCard
              title="Expiring Soon"
              value={items.filter(item => {
                const daysUntilExpiration = Math.ceil(
                  (item.expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                return daysUntilExpiration <= 3 && daysUntilExpiration > 0;
              }).length.toString()}
              description="Items expiring in 3 days"
            />
            <StatCard
              title="Categories"
              value={new Set(items.map(item => item.category)).size.toString()}
              description="Different categories"
            />
          </div>

          {/* Inventory Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <InventoryTable
              items={items}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          </div>
        </div>
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(undefined);
        }}
        onSubmit={editingItem ? handleUpdateItem : handleAddItem}
        editItem={editingItem}
      />
    </DashboardLayout>
  );
}

function StatCard({ title, value, description }: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}