# Generated by Django 2.2 on 2019-11-09 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('competence_center', '0003_auto_20191109_1336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='passedtest',
            name='incorrect_questions',
            field=models.ManyToManyField(blank=True, null=True, related_name='passed_test_incorrect_questions', to='competence_center.Question'),
        ),
    ]
