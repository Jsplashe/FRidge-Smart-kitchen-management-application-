import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { format, startOfWeek, addDays } from 'date-fns';
import { ChefHat, Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Meal, DayPlan } from '../types/meal';

const savedRecipes: Meal[] = [
  {
    id: 'recipe-1',
    title: 'Chicken Salad',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    type: 'lunch',
    calories: 450,
    prepTime: '20 mins'
  },
  {
    id: 'recipe-2',
    title: 'Grilled Salmon',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    type: 'dinner',
    calories: 580,
    prepTime: '25 mins'
  },
  {
    id: 'recipe-3',
    title: 'Avocado Toast',
    imageUrl: 'https://images.unsplash.com/photo-1603046891744-56e9c3c8c6b6',
    type: 'breakfast',
    calories: 320,
    prepTime: '10 mins'
  }
];

export default function Planner() {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(
    Array.from({ length: 7 }, (_, i) => ({
      id: `day-${i}`,
      date: addDays(startDate, i),
      breakfast: i === 0 ? savedRecipes[2] : undefined,
      lunch: i === 0 ? savedRecipes[0] : undefined,
      dinner: i === 0 ? savedRecipes[1] : undefined
    }))
  );

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const [sourceDay, sourceType] = source.droppableId.split('-');
    const [destDay, destType] = destination.droppableId.split('-');

    const newWeekPlan = [...weekPlan];

    let meal;
    if (source.droppableId === 'saved-recipes') {
      meal = savedRecipes[source.index];
    } else {
      const sourceDayPlan = weekPlan.find(day => day.id === sourceDay);
      meal = sourceDayPlan?.[sourceType as keyof typeof sourceDayPlan];
      newWeekPlan.find(day => day.id === sourceDay)![sourceType as keyof DayPlan] = undefined;
    }

    if (meal) {
      newWeekPlan.find(day => day.id === destDay)![destType as keyof DayPlan] = meal;
      setWeekPlan(newWeekPlan);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Weekly Meal Planner</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Saved Recipes Sidebar */}
            <div className="lg:w-64 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-emerald-600" />
                Saved Recipes
              </h2>
              
              <Droppable droppableId="saved-recipes">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {savedRecipes.map((recipe, index) => (
                      <Draggable
                        key={recipe.id}
                        draggableId={recipe.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 rounded-lg border ${
                              snapshot.isDragging
                                ? 'bg-emerald-50 border-emerald-200'
                                : 'bg-white border-gray-200'
                            } shadow-sm hover:shadow transition-shadow`}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {recipe.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {recipe.prepTime} • {recipe.calories} cal
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Weekly Calendar */}
            <div className="flex-1">
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-7 gap-4">
                  {weekPlan.map((day) => (
                    <div key={day.id} className="space-y-2">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {format(day.date, 'EEE')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(day.date, 'MMM d')}
                        </div>
                      </div>

                      {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => (
                        <Droppable
                          key={`${day.id}-${mealType}`}
                          droppableId={`${day.id}-${mealType}`}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`h-24 p-2 rounded-lg border ${
                                snapshot.isDraggingOver
                                  ? 'bg-emerald-50 border-emerald-200'
                                  : 'bg-white border-gray-200'
                              } transition-colors`}
                            >
                              {day[mealType] ? (
                                <Draggable
                                  draggableId={`${day.id}-${mealType}-${day[mealType]!.id}`}
                                  index={0}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`h-full rounded-md p-2 ${
                                        snapshot.isDragging
                                          ? 'bg-emerald-100'
                                          : 'bg-gray-50'
                                      }`}
                                    >
                                      <div className="text-xs font-medium text-gray-500 mb-1 capitalize">
                                        {mealType}
                                      </div>
                                      <div className="text-sm font-medium text-gray-900 truncate">
                                        {day[mealType]!.title}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <button className="text-gray-400 hover:text-gray-500">
                                    <Plus className="h-5 w-5" />
                                  </button>
                                </div>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      ))}
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}