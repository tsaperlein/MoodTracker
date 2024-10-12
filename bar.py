import matplotlib.pyplot as plt
import pandas as pd

# Data provided by the user
data = {
    "Name": ["User 5", "User 5", "User 5", "User 5", "User 5", "User 5", 
             "User 7", 
             "User 4", "User 4", "User 4",
             "User 3", 
             "User 2", "User 2", "User 2",
             "User 6", 
             "User 1", "User 1", "User 1"],
    "Survey": [1, 2, 3, 4, 5, 6, 1, 1, 2, 3, 1, 1, 2, 3, 1, 1, 2, 3],
    "Score": [4, 5, 3, 6, 3, 2, 1, 5, 2, 7, 5, 0.1, 1, 0.1, 2, 7, 6, 4],
    "Start Date": ["2024-09-05", "2024-09-08", "2024-09-12", "2024-09-15", "2024-09-19", "2024-09-23", 
                   "2024-09-05", 
                   "2024-09-06", "2024-09-09", "2024-09-13",
                   "2024-09-07", 
                   "2024-09-08", "2024-09-15", "2024-09-18",
                   "2024-09-08", 
                   "2024-09-13", "2024-09-17", "2024-09-23"],
    "End Date": ["2024-09-07", "2024-09-11", "2024-09-14", "2024-09-18", "2024-09-21", "2024-09-27",
                 "2024-09-07",
                 "2024-09-08", "2024-09-11", "2024-09-21",
                 "2024-09-09",
                 "2024-09-14", "2024-09-16", "2024-09-25",
                 "2024-09-24",
                 "2024-09-16", "2024-09-21", "2024-09-26"]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Convert the date columns to datetime format
df['Start Date'] = pd.to_datetime(df['Start Date'])
df['End Date'] = pd.to_datetime(df['End Date'])

# Create a color mapping for surveys
survey_colors = {1: '#1f77b4', 2: '#ff7f0e', 3: '#2ca02c', 4: '#d62728', 5: '#9467bd', 6: '#8c564b'}

# Create a figure with subplots for each user
fig, axes = plt.subplots(len(df['Name'].unique()), 1, figsize=(10, 13), sharex=True)

# Plotting each user's survey scores in a separate subplot
user_names = df['Name'].unique()
for i, (name, group) in enumerate(df.groupby('Name')):
    # Plot each survey as a bar in the respective user's subplot
    for idx, row in group.iterrows():
        width = (row['End Date'] - row['Start Date']).days  # Calculate the bar width based on the duration
        axes[i].bar(row['Start Date'], row['Score'], width=width, align='edge', color=survey_colors[row['Survey']])
        
    # Format each subplot
    axes[i].set_ylabel(name, rotation=0, labelpad=60, fontsize=12)
    axes[i].set_ylim(0, 10)
    axes[i].grid(axis='y')

# Set x-ticks and labels for the shared x-axis
date_range = pd.date_range(start="2024-09-05", end="2024-09-27")
axes[-1].set_xticks(date_range)
axes[-1].set_xticklabels([date.strftime('%-d/%-m') for date in date_range], rotation=45)

# Adjust layout to add padding
fig.tight_layout()
fig.subplots_adjust(left=0.15, right=0.95, top=0.92, bottom=0.1, hspace=0.5)

# Create a single legend for all subplots
legend_labels = [f'Survey {i}' for i in survey_colors.keys()]
legend_handles = [plt.Rectangle((0, 0), 1, 1, color=color) for color in survey_colors.values()]
fig.legend(legend_handles, legend_labels, loc='upper center', ncol=6, title='Surveys', bbox_to_anchor=(0.5, 1.02))

# Show the plot
plt.show()
