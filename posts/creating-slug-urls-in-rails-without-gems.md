---
title: 'Creating slug URLs in Rails without gems'
date: '2018-04-23'
preview: 'In this article we will use a human readable URL instead of id’s , so instead of having an awful url like...'
---

In this article we will use a human readable URL instead of id’s , so instead of having an awful url like [_http://localhost:3000/articles/114_](http://localhost:3000/articles/114)  wouldn’t [_http://localhost:3000/articles/114-creating-slug-urls-in-rails-without-gems_](http://localhost:3000/articles/114-creating-slug-urls-in-rails-without-gems)  be better ? So

### First add slug to the table


```
> rails generate migration AddSlugToArticles slug:string
```

run the migration

```
> rake db:migrate
```

### Next create a method to generate the slug


```
#app/model/article.rbclass Article < ApplicationRecord privatedef set_slug  
self.slug = title.to_s.parameterize  
end 
```

The parameterize method replace the special characters with hyphens

```
> "Creating slug URLs in Rails without gems".to_s.parameterize  
=> "creating-slug-urls-in-rails-without-gems"
```

Then ensure that set_slug is called in create and update by adding

```
#app/model/article.rbclass Article < ApplicationRecord  
after_validation :set_slug, only: [:create, :update]  
 .  
 .  
 .  
end
```

If you already have created records you can run this commands

```
> articles = Article.all  
> articles.each do |article|  
    article.update(slug: article.title.parameterize)  
end
```

### Finally override Rails default to_param method


To generate the slug we should force Rails to use both slug and ids instead of just the ids by overwriting the to_param method

```
#app/model/article.rbclass Article < ApplicationRecord  
after_validation :set_slug, only: [:create, :update]def to_param  
  "#{id}-#{slug}"  
end  
 .  
 .  
 .  
end
```

> Note : We used the id with the slug in order to have a better performance because the id column are normally unique and indexed .

Now we can find the record just by id and have a beautiful url, that’s work because in rails _find_by_id_ call _to_i_ method and ruby only casts all numeric characters

```
> "114-creating-slug-urls-in-rails-without-gems".to_i  
=> 114
```

### Conclusion

if you want to clean your URLs, without hitting the performance, this strategy will work for you.
