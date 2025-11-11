# 📚 Modular Content Structure

## Overview
The lesson content for Finance Yatra has been reorganized into a modular file structure for better maintainability, scalability, and organization.

## Directory Structure

```
src/data/
├── lessonContent.js           # Main file that imports and exports all modules
├── learningModules.js         # Module metadata (titles, descriptions, etc.)
├── contentTemplates.js        # Templates and guidelines for content creation
└── modules/                   # Individual module content files
    ├── module-1-banking.js
    ├── module-2-digital-payments.js
    ├── module-3-loans.js
    ├── module-4-budgeting.js
    ├── module-5-insurance.js
    ├── module-6-investment-basics.js
    ├── module-7-tax-planning.js
    └── module-8-15-advanced.js
```

## File Organization

### Module Files (`module-X-name.js`)

Each module file exports a single object with this structure:

```javascript
export const moduleXContent = {
  title: 'Module Title',
  lessons: [
    {
      id: 0,
      title: 'Lesson Title',
      subtitle: 'Lesson Subtitle',
      duration: 'X mins',
      content: `HTML content`,
      keyPoints: ['point 1', 'point 2', ...],
      quiz: [
        {
          type: 'mcq' | 'scenario' | 'calculation' | 'truefalse',
          question: 'Question text',
          options: ['option 1', 'option 2', ...],
          correct: 0, // index of correct answer
          explanation: 'Detailed explanation'
        },
        // ... more questions
      ]
    },
    // ... more lessons
  ]
};
```

## Main Integration File (`lessonContent.js`)

The main `lessonContent.js` file imports all module content and exports them as a single object:

```javascript
import { module1Content } from './modules/module-1-banking.js';
import { module2Content } from './modules/module-2-digital-payments.js';
// ... more imports

export const lessonContent = {
  'module-1': module1Content,
  'module-2': module2Content,
  // ... more modules
};
```

## Status of Modules

### ✅ Complete Modules
- **Module 1**: Banking Basics (5 lessons, 26 quizzes)
- **Module 2**: Digital Payments (4 lessons, 21 quizzes)

### ⏳ In Progress
- **Module 3**: Understanding Loans (1 lesson template)

### ⬜ Placeholder Modules (Empty)
- Module 4: Saving & Budgeting
- Module 5: Insurance Essentials
- Module 6: Investment Basics
- Module 7: Tax Planning
- Modules 8-15: Advanced topics

## Benefits of Modular Structure

### 1. **Maintainability**
- Each module is in its own file
- Easy to find and edit specific content
- Reduces risk of breaking other modules

### 2. **Scalability**
- Add new modules without touching existing files
- Clear separation of concerns
- Easy to version control individual modules

### 3. **Collaboration**
- Multiple developers can work on different modules simultaneously
- Reduces merge conflicts
- Clear ownership of module files

### 4. **Performance**
- Can implement lazy loading for unused modules
- Reduces initial bundle size
- Faster development build times

### 5. **Organization**
- Logical file structure mirrors app structure
- Easy to navigate codebase
- Clear content hierarchy

## How to Add New Content

### Adding a New Lesson to Existing Module

1. Open the module file (e.g., `module-3-loans.js`)
2. Add new lesson object to the `lessons` array
3. Include all required fields: id, title, subtitle, duration, content, keyPoints, quiz
4. Test the content in the app

### Creating a New Module

1. Create a new file: `modules/module-X-name.js`
2. Export the module content with the standard structure
3. Import in `lessonContent.js`:
   ```javascript
   import { moduleXContent } from './modules/module-X-name.js';
   ```
4. Add to the lessonContent object:
   ```javascript
   'module-X': moduleXContent,
   ```
5. Ensure corresponding metadata exists in `learningModules.js`

## File Naming Convention

- Use lowercase with hyphens: `module-X-descriptive-name.js`
- Module number should match the ID in `learningModules.js`
- Name should be descriptive but concise

Examples:
- ✅ `module-1-banking.js`
- ✅ `module-3-loans.js`
- ✅ `module-13-credit-cards.js`
- ❌ `Module1.js`
- ❌ `banking-basics.js`
- ❌ `module_1_banking.js`

## Content Standards

### Each Lesson Must Have:
- ✅ Unique `id` (0-indexed within module)
- ✅ Clear `title` and `subtitle`
- ✅ Estimated `duration` (reading time)
- ✅ Comprehensive HTML `content`
- ✅ 3-4 `keyPoints`
- ✅ 5-6 quiz questions

### Each Quiz Question Must Have:
- ✅ Valid `type` (mcq, scenario, calculation, truefalse)
- ✅ Clear `question` text
- ✅ 4 `options` (for mcq/scenario/calculation) or 2 (for truefalse)
- ✅ Correct answer `correct` (index number)
- ✅ Detailed `explanation`

## Import/Export Pattern

### Module File (Export)
```javascript
// module-1-banking.js
export const module1Content = {
  title: 'Banking Basics',
  lessons: [...]
};
```

### Main File (Import + Re-export)
```javascript
// lessonContent.js
import { module1Content } from './modules/module-1-banking.js';

export const lessonContent = {
  'module-1': module1Content
};
```

### Component Usage (Import from Main)
```javascript
// React Component
import { getLessonContent } from '../data/lessonContent';

const lesson = getLessonContent('module-1', 0);
```

## Migration Notes

### From Old Structure
The old structure had all content in a single `lessonContent.js` file (1600+ lines). This has been split into:
- Module 1 → `module-1-banking.js` (850 lines)
- Module 2 → `module-2-digital-payments.js` (650 lines)
- Main file → `lessonContent.js` (100 lines with imports)

### Backward Compatibility
The public API remains the same:
- `getLessonContent(moduleId, lessonIndex)` - works identically
- `getModuleLessons(moduleId)` - works identically
- `hasLessonContent(moduleId)` - works identically

No changes needed in React components!

## Best Practices

### DO ✅
- Keep each module in its own file
- Follow the standard structure
- Include comprehensive quiz explanations
- Use Indian financial context (₹, Indian banks, RBI, etc.)
- Test content before committing

### DON'T ❌
- Mix content from multiple modules in one file
- Skip quiz questions or explanations
- Use jargon without explanation
- Copy-paste without adapting to Indian context
- Commit untested content

## Tools Available

### Content Templates
Use `contentTemplates.js` for:
- Lesson structure template
- Quiz question templates
- Indian financial context reference
- Writing tips and guidelines

### Implementation Guide
Refer to `CONTENT_IMPLEMENTATION_GUIDE.md` for:
- Complete roadmap of all 15 modules
- Topic outlines for each lesson
- Quality checklist
- Time estimates

### Progress Tracking
See `CONTENT_PROGRESS_TRACKER.md` for:
- Current status of each module
- Completion percentages
- Next priorities
- Timeline estimates

## Testing Checklist

Before marking a module complete:
- [ ] All lessons have complete content
- [ ] Each lesson has 5-6 quiz questions
- [ ] All quiz answers have detailed explanations
- [ ] Content is in Indian context (₹, Indian banks, etc.)
- [ ] HTML is properly formatted
- [ ] No grammatical errors
- [ ] Key points are clear and actionable
- [ ] Content tested in the app
- [ ] Module imports correctly in main file

## Future Enhancements

### Planned Improvements
1. **Content Versioning**: Track content changes over time
2. **A/B Testing**: Test different content variations
3. **Analytics Integration**: Track which lessons are most effective
4. **Content Validation**: Automated checks for content quality
5. **Localization**: Multi-language support structure

### Possible Optimizations
- Lazy loading of module content
- Content caching strategy
- Progressive content loading
- Offline content availability

---

## Quick Reference

### File Locations
```
Complete: /src/data/modules/module-1-banking.js
Complete: /src/data/modules/module-2-digital-payments.js
Template: /src/data/modules/module-3-loans.js
Empty:    /src/data/modules/module-4-budgeting.js
Empty:    /src/data/modules/module-5-insurance.js
Empty:    /src/data/modules/module-6-investment-basics.js
Empty:    /src/data/modules/module-7-tax-planning.js
Empty:    /src/data/modules/module-8-15-advanced.js
```

### Key Functions
```javascript
getLessonContent(moduleId, lessonIndex)  // Get specific lesson
getModuleLessons(moduleId)               // Get all lessons in module
hasLessonContent(moduleId)               // Check if module has content
```

### Module IDs
```
'module-1'  → Banking Basics
'module-2'  → Digital Payments
'module-3'  → Understanding Loans
'module-4'  → Saving & Budgeting
'module-5'  → Insurance Essentials
...
'module-15' → Portfolio Management
```

---

*Last Updated: November 2025*  
*Structure Version: 2.0*  
*Status: Modular Migration Complete* ✅
